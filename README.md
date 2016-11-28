# Telebot

This is an app to communicate with a Telegram bot. To use this app you can let it associated to my bot or associate with your own.

#####Use my own bot
Start the bot in your Telebot with this link: 
https://web.telegram.org/#/im?p=%40Rotelebot

#####Use your bot
Create your bot and put it's key in `BOT_KEY` in `/src/back/config.js`

----

### Quick Start

####Database
1. Start MongoDB
2. Create `telebot` database (`use telebot`)
3. Create `chats` collection (`db.createCollection(chats)`)

All set here.

    MongoDB connection settings: /back/config.js

####Server
Start 2 services in NodeJs:
* Front: `/src/front/index.js` (port: 3001)
* Back: `/src/back/index.js` (port: 3000)

####Application
1. Access [http://localhost:3001]()
2. Do login by e-mail or SMS
   > Since the login needs a HTTPS connection, you may use a tunneler (like ngrok). 
   However, the Websocket uses a HTTP connection and, therefore, won't work with the HTTPS. 
   Said that, you may try authentication, but to use the app you may enter the page directly.
   
       In fact, loggin isn't implemented right 
       (there is no real authentication process)
   
3. Enter [http://localhost:3001/chatRoom]()
   > HTTP Websocket and HTTP connection
4. Start a connection with the Bot in Telegram
5. Talk

****

### Next steps

- [ ] Persist loggin with Facebook Account Kit
- [ ] Don't send empty message
- [x] /start checks for previous registration
- [ ] Mobile responsive
- [x] Minify bundle.js
- [ ] Get user avatar
- [x] Handle 'if no user'
- [ ] If large message: hide
- [x] Send only the messages for the active chat, not for all chats at once
- [x] Create tests for backend files

