import makeWASocket,{
  DisconnectReason,
  fetchLatestBaileysVersion,
  
} from "@adiwajshing/baileys";
import log from "@adiwajshing/baileys/lib/Utils/logger";
import BaileysBottle from "baileys-bottle"
import { Boom } from "@hapi/boom";

const Dalai = require("dalai");
console.clear();
console.log("Initializing DB...");
BaileysBottle.init({
  type: "sqlite",
  database: "db.sqlite",
}).then(async (bottle) => {
  console.log("DB initialized");
  const client = async (clientName: string) => {
    console.log(`Starting client "${clientName}"`);
    
    const logger = log.child({});
    logger.level = "silent";

    console.log("Creating store...");
    const { auth, store } = await bottle.createStore(clientName);
    console.log("Creating auth...");
    const { state, saveState } = await auth.useAuthHandle();
    console.log("Done");

    const startSocket = async () => {
      const { version, isLatest } = await fetchLatestBaileysVersion();
      console.log(`using WA v${version.join(".")}, isLatest: ${isLatest}`);

      const sock = makeWASocket({
        version,
        printQRInTerminal: true,
        auth: state,
        logger,
      });

      store.bind(sock.ev);

      sock.ev.process(async (events) => {
        //
        // Start your bot code here...
        //
        if (events["messages.upsert"]) {
          const upsert = events["messages.upsert"];
          console.log("recv messages ", JSON.stringify(upsert, undefined, 2));
          if (upsert.type === "notify") {
            for (const msg of upsert.messages) {
              if (!msg.key.fromMe) {
                // mark message as read
                await sock!.readMessages([msg.key]);
                console.log(msg);
                sock.fetchStatus
                  //"###Instruction: You are chatbot and your name is Milk follow the conversation flow and reply to Human Questions \n\n###Response:"
                const msgbuilder="###Instruction: You are chatbot \n\n###Response:"+
                ( (msg.message.hasOwnProperty("extendedTextMessage")) ? `\n[${msg.key.remoteJid === msg.message.extendedTextMessage.contextInfo.participant ? msg.pushName : ("917262933876@s.whatsapp.net"===msg.message.extendedTextMessage.contextInfo.participant ? "ChatBot" : "Someone"    )}]: ${msg.message.extendedTextMessage.contextInfo.quotedMessage.conversation || msg.message.extendedTextMessage.contextInfo.quotedMessage.extendedTextMessage.text}` : ""  ) +
                `\n[${msg.pushName}]: ${msg.message.conversation || msg.message.extendedTextMessage.text}` + 
                "\n[ChatBot]: "
                console.log(msgbuilder);
                
                

                let rawtkn=""
                await new Dalai().request(
                  {
                    //  url: "ws://localhost:3000",
                    model: "alpaca.7B",
                    prompt: msgbuilder,
                    threads: 3,
                    n_predict:3,

                    skip_end: false,
                  },
                  (token) => {
                    
                    rawtkn += token;
                    
                  }
                );

                rawtkn=rawtkn.slice(msgbuilder.length-1)
                rawtkn = rawtkn.split(`[${msg.pushName}]:`)[0];
                rawtkn = rawtkn.split(`[ChatBot]:`)[0];
                rawtkn = rawtkn.split(`[Someone]:`)[0];

                rawtkn = rawtkn.split(`[`)[0];//WIP

                rawtkn = rawtkn.replace(/[\n\r]/g, "")
                .replace("<end>", "")
                .replace("[end of text]", "");
                rawtkn = rawtkn.trim()    

                
                await sock!.sendMessage(msg.key.remoteJid!,{ text: rawtkn }, { quoted: msg })
             
              }
            }
          }
        }
        //
        // End your bot code here...
        //

        // credentials updated -- save them
        if (events["creds.update"]) await saveState();

        if (events["connection.update"]) {
          const update = events["connection.update"];
          const { connection, lastDisconnect } = update;
          connection === "open"
            ? console.log("Connected")
            : connection === "close"
            ? (lastDisconnect?.error as Boom)?.output?.statusCode !==
              DisconnectReason.loggedOut
              ? startSocket()
              : console.log("Connection closed. You are logged out.")
            : null;
        }
      });
    };

    startSocket();
  };

  await client("client 1");
  // await client("client 2");
  // await client("client 3");
  // ...
});


