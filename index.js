require("dotenv").config();
const express = require("express");
const expressApp = express();
const axios = require("axios");
const path = require("path");
const port = process.env.PORT || 7777;
expressApp.use(express.static("static"));
expressApp.use(express.json());
require("dotenv").config();
const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);
expressApp.get("/", (req, res) => {
  console.log("server started at port", port);
  res.sendFile("/index.html");
});
bot.launch();

bot.command("start", (ctx) => {
  console.log(ctx.from);
  bot.telegram.sendMessage(
    ctx.chat.id,
    "Hello there! Welcome to the Code Capsules telegram bot.\nI respond to /ethereum. Please try it",
    {}
  );
});

bot.command("user", (ctx) => {
  console.log("name >>>>> ", ctx.message.text);
  const username = ctx.message.text.split(' ')[1];
  const apiKey = "978136bc16msh0a47a7343676f53p17367djsn538ecaa9237a";
  var rate;
  axios
    .get(
      `https://twitter154.p.rapidapi.com/user/details?username=${username}`,
      {
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "twitter154.p.rapidapi.com",
        },
      }
    )
    .then(async (response) => {
      //   console.log(response.data);
      const username = response.data.username;
      const FullName = response.data.name;
      const Followers = response.data.follower_count;
      const Following = response.data.following_count;
      const NoofTweets = response.data.number_of_tweets;
      const profileImg = response.data.profile_pic_url;
      const Description = response.data.description;
      if(profileImg) await ctx.replyWithPhoto({ url: profileImg });
      const message = `NoofTweets : ${NoofTweets} \n Followers : ${Followers} \n Following : ${Following} \n Username : ${username} \n FullName : ${FullName} \n Description : ${Description} `;
      bot.telegram.sendMessage(ctx.chat.id, message, {});
    });
});
