
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

interface Lesson {
  slug: string;
  title: string;
  content: string;
}

const courseLessons: Lesson[] = [
  {
    slug: "introduction",
    title: "Introduction",
    content: `
      <h2>Introduction</h2>
      <p>Hi, it's Alex here. Thanks for checking out my public relations course. So let me just back up a little bit and explain a little bit of the reason behind why I decided to make a public relations course.</p>
      <p>So if you don't know me, I've been doing PR for eight plus years. I've been working in-house for consumer tech brands and I've also worked with a bunch of fairly large agencies and with PR software companies. And so essentially there's a lot of PR knowledge in my head that I kind of wanted to share with people.</p>
      <p>And you know, of late I've been obviously sharing a lot online, on social media, on X, on Twitter, obviously on YouTube, on Instagram or whatever, et cetera, et cetera.</p>
      <p>So, basically, I realized that, you know, I've been sharing this knowledge, but I haven't really, kind of organized it in any particular way. And, you know, when I thought about this, I thought, what's the best way to do this? And, of course, naturally I thought about a course.</p>
      <p>And what I'm trying to do with this course is, you know, I think a lot of people will say like, you know, they make courses, they will say like, 'we don't want to just make like, you know, a regular course.' And of course, that's my objective as well.</p>
      <p>But basically, a lot of this public relations knowledge I'm going to share with you is kind of based on my own experiences. It's not generic. It's kind of things that I have an opinion on. So, obviously it might not be suitable for everyone, but I think it covers the core tenets of public relations. And that's why I feel confident to put this out.</p>
      <p>So, you know, what the course is going to do is it's going to give you like a kind of overview of PR quickly if you're not, you know, you're not super knowledgeable about the field.</p>
      <p>I'm going to talk about like the type of people you want to work with in PR, whether that's because you're hiring someone for your team or you're hiring an agency. I'm going to talk about like the core aspects of PR, namely media relations, crisis management, content creation, and strategy.</p>
      <p>I'm also going to talk a little bit about public speaking and how you can kind of manage reputation. And then I'm going to end this course, focusing some of the more the newer aspects of PR, namely SEO and digital, as well as like using tools and analytics.</p>
      <p>So, yeah, I mean, it's been quite a journey for me. And, you know, the final part of the course, we'll talk a little bit about that. But I want to kind of keep, you know, keep on top of this and try and update the course, because like a lot of fields, PR is changing.</p>
      <p>It's moving away from a lot of the traditional practices to being far more direct in the kind of social AI era we're in now. So, yeah, hope you enjoy the course. Take your time, you know, try and try and absorb everything. And if you have any questions, just ask me via all of my social media handles. And you can also drop me an email directly. Alex at alexmcgregor.com, and I will respond. So, that said, please go ahead and enjoy this course.</p>
    `
  },
  {
    slug: "why-pr-more-than-editorial",
    title: "Why PR is More Than Editorial",
    content: `
      <h2>Why PR is More Than Editorial</h2>
      <p>All right guys, before we get into the kind of meat of the introduction, I just want to back up and talk a little bit about PR itself right now and the kind of state of PR.</p>
      <p>Most people when you talk to them about public relations (PR), they think that essentially what PR is is newspapers. That's the kind of historical first impression - it's about getting your client or getting press, and you know that is still a large part of PR.</p>
      <p>But in the sense that as the newspaper industry has kind of declined in terms of reach and overall impact, traditional PR in that way is kind of dead. What I mean by that is all of the ecosystem around getting coverage in newspapers, whether that be news wires or certain types of agencies, that's kind of going away.</p>
      <p>Obviously now like everyone's got a smartphone in their pocket and they've got social media accounts, and so what's happening is basically a lot of the gatekeepers are changing from traditional media to social media and tech.</p>
      <p>But obviously some other areas are still very important in the traditional sense - things like corporate communications, things like crisis management, and so on.</p>
      <p>What I'm trying to say is I think we're in a transition period right now with respect to the actual PR field, and everyone that's involved has kind of seen this change in the last maybe five years, then obviously accelerated with the introduction of AI.</p>
      <p>I do ruminate on this at the end of the course in more detail about where I think it's going, but just to kind of give you a preview, what we're seeing is basically more people now going direct. What that means is founders and different personalities, celebrities, you name it - everyone is just posting content on YouTube and their own social media.</p>
      <p>That has changed a lot of the conventional ways of communicating, but as I'll explain in this course, a lot of the concepts very much still apply and are perhaps even more important than ever because there's so much information out there now and misinformation, and that's only going to accelerate with AI. So that's just my opinion, but I think it's a good kind of starting point for this course as well.</p>
    `
  },
  {
    slug: "starting-career-in-pr",
    title: "Starting a Career in PR",
    content: `
      <h2>Starting a Career in PR</h2>
      <p>Hi guys, it's Alex back with another video today. I'm going to talk about something that I was asked actually recently from someone about how to break into PR and it can be sort of quite daunting like when you're kind of learning a new field and you're not sure kind of like how to get up to speed.</p>
      <p>I see a lot of this on the Reddit PR subreddit. I'll just pull up on the screen you can take a look. I kind of scan this every day and it's really interesting some of the questions I get asked and you know I try and engage on that and I recommend before I get into this video I'll check that out.</p>
      <p>Yeah, so basically someone came to me said oh how do I how do I kind of get into PR in I guess in 2024 and things have changed a lot like I've talked about in prior videos. AI two years ago completely turned the field upside down. The copywriting - the whole copywriting thing was a massive part of PR and that's kind of not gone away but it's definitely changed both from a client perspective and like a PR agency perspective.</p>
      <p>So that's something that's changed but fundamentally, like a lot of the things that we used to do, we still do, and they are still very relevant. So the four things I kind of mentioned to her were very simple:</p>
      <p>The first one is like a PR person is not a journalist. I mean there are a lot of journalists going into PR purely because of the state of the journalism industry, but you know in most cases PR people have not done journalism before.</p>
      <p>Personally, I'd never been a journalist; I love to read the news. I love to read the Economist and Financial Times like I've been reading that since college and I've always taken an interest in the news. I think that doesn't always come naturally to people. Some people don't really care about politics, current affairs, but unfortunately in PR, you need to check Google News, Financial Times, and other news websites, as well as YouTube, to stay abreast of current affairs.</p>
      <p>The second thing I think you've got to do is you have to be sort of a public person in a way so you need to be posting on social networks, X, LinkedIn. That's tough because, you know, I actually worked with a lot of people in the PR comm space who are introverts, surprisingly. They preferred more of the internal comm stuff, but a big part of PR is dealing with the external stuff - media relations, crisis management, and interacting with people outside the company.</p>
      <p>What helps with that in my experience is talking to people online and posting on social networks. You're doing a lot of work and not getting a lot of assets, but you have to be thrown into the lion's den. Especially if you're representing a famous company, you're going to be personally associated with that company and there's going to be blowback.</p>
      <p>The third thing that helped me move along faster was talking and liaising with other PR people. It's not so obvious because if you're in an industry, PR people view each other quite suspiciously. But in the end, if you work in an industry for a long time, your friends become your enemies and your enemies become your friends. People move companies, companies buy companies, so make professional relationships with people in the same industry.</p>
      <p>The fourth thing is dealing with rejection. When you work in other parts of marketing, there's not much rejection - you follow a schedule and do things. But with PR, you're pitching people both internally and externally, and they might reject you. It's the way you deal with that rejection which affects your ability to do the job, and also the fear of rejection. You need to accept that things are not going to always work out.</p>
      <p>So yeah, the four things: follow the news, engage on social media responsibly, network with people in PR, and get over the fear of rejection as quickly as possible. If you do these kind of four things, then I think you're kind of on your way to a good career in PR.</p>
    `
  },
  {
    slug: "on-off-record",
    title: "On The Record vs. Off The Record",
    content: `
      <h2>On The Record vs. Off The Record</h2>
      <p>Hey guys, it's Alex back with a new video today. I'm going to talk today about on the record versus off the record. Now, this is something that a lot of people get confused about, especially if they haven't encountered it before.</p>
      <p>I can tell you a story actually. I went to a conference in Barcelona when I first got this PR job. The first time I was in PR actually. And I went to do an interview with a journalist. I'm not going to name the guy who I talked to. I sat down with him in a cafe in Barcelona. And basically he worked for, I would say, like a middle-ranked news outlet at the time. And unfortunately, that outlet has since kind of gone under.</p>
      <p>But it was quite a famous one. It was up and coming. And I was, again, very wet behind the ears. And my company was relatively unknown, but a very large company in the space. So there were a lot of dynamics at play. And I didn't really know about on the record versus off the record. I kind of I've heard it on the record thing before. But I was like, well, just keep your mouth shut when you don't need to say something. Or, you know, that. That was my kind of gist of it. And I made a mistake. I actually I disclosed stuff that was it was that I shouldn't have disclosed, even though it was an off the record interview.</p>
      <p>So I just want to go through the pitfalls and things you should know about on the record, off the record, just to put the record straight on this.</p>
      <p>Essentially, on the record basically means that, unless you specify otherwise, then everything can be taken as the truth. That's just my definition. I didn't Google that. I didn't use ChatGPT. I just take that from the top of my head. But I think it kind of is accurate. And if you adopt this approach, then on the record, you have to be extremely clear about what you're saying because anything you say from your name to your job title could be picked up on, even the body language.</p>
      <p>Moving to off the record, a situation where you can say what you like and nothing will be reported or picked up on. That's hard to imagine in the Internet age. Before internet and social media, off the record was extremely powerful because if you said off the record, it stayed off the record.</p>
      <p>Now, the issue is that there's smartphones everywhere taking video, people recording audio, social media, microphones everywhere, phones, and hacking. So off the record kind of doesn't really exist in the modern media landscape.</p>
      <p>That said, sometimes it can be used as a tool. The way you work with media is you give them something and they give you something in return - I scratch your back, you scratch my back. There's many times when I provided off-the-record information to journalists in order for them to write a story that in some way benefited my company.</p>
      <p>For example, you could provide your contact with information about a potentially new market your company is going into and put it under embargo. They can't announce this until such and such a date, but you give them the information beforehand and they can write a story.</p>
      <p>There's many instances where off the record helps you build relationships. The reason you do off the record is because you don't want to disclose anything about your company or any situation that could put you at risk. But at the same time, you use off the record to help grow those relationships.</p>
      <p>So in general, I think you have to say that off the record is not as viable as before, but still overlooked in this environment.</p>
      <p>That's just an overview of on the record versus off the record. If you're approaching this for the first time, definitely have caution. But at the same time, trust yourself and be confident that you understand the differences between the two.</p>
    `
  },
  {
    slug: "great-pr-person",
    title: "Things That Make a Great PR Person",
    content: `
      <h2>Things That Make a Great PR Person</h2>
      <p>Hey guys, it's Alex with a new video today. Today I'm just going to talk about something that I think could help possibly for startup companies or founders looking to bring in their first PR hire.</p>
      <p>I've worked in many PR roles, I've been interviewed for PR roles, and I've made a collection of what I think are some of the attributes required for a PR person. Hopefully these can help you if you're thinking about either hiring a person in-house or hiring an agency or looking at getting some expertise.</p>
      <p>The first thing I would say is: You know, obviously you want to find someone that has both high IQ and high EQ. And especially I want to talk about the latter in terms of EQ because, of course IQ is important, especially when you're hiring for a role where the product is super technical.</p>
      <p>For example, right now a lot of companies are hiring PR people for AI products and services, and these are fundamentally extremely complex because they usually employ some kind of technology, model, or algorithm that's super technical for most people.</p>
      <p>But definitely more important for a PR person is having that EQ because they're possibly out of any role in the marketing department, the one that has to have that kind of emotional ability to interact with all the stakeholders be it internal or external.</p>
      <p>Some of the most crucial aspects of the job are media relations where you're talking to journalists. That requires a large network of journalists. You've got to keep them happy, interact with them, and put up with the ups and downs of journalists which typically is the case. And then secondly, the crisis aspect - if you have a crisis situation, the PR person needs to have the emotional intelligence to be able to deal with this situation effectively.</p>
      <p>So first point in terms of PR attributes: definitely high IQ and more importantly, high EQ.</p>
      <p>Second thing I would say is, you need to have a passion for news. It sounds obvious but in PR you're working with media, you've got to keep an eye out in terms of news for content, and you have to be able to understand the news cycle. You have to have a passion for news and I think that's personally kind of what inspired me to move into the PR field - I love reading news every day.</p>
      <p>The third thing I would say is definitely got to have a low ego. Many times in your PR job, you're going to be rejected internally. You might be pitching projects, ideas, and those are going to be rejected frequently. Externally, you're going to be pitching journalists and partners, again, going to be rejected.</p>
      <p>You have to be willing to be rejected, and have that kind of low ego humility that's going to get you far in the job. There's been so many times when I met with prospective partners and journalists, and what I pitched didn't hit first time, but then maybe six twelve months down the line it does land. It stems back to that low ego thing, which is difficult in marketing because a lot of people in marketing have naturally high egos.</p>
      <p>The fourth thing is the person needs to have sort of a taste or an ability to curate. If you think about a company, there's so much noise and potential stories, content, potential things you can talk about, and the PR person's job is to sort through it all and curate the stuff that really matters, that's going to drive pickup in media or reputation.</p>
      <p>The person needs to understand how to curate content both from internal and external sources and have a discretion for what's good and what's not good.</p>
      <p>Also, the person needs to be a good storyteller and understand storytelling. That's fundamental - if you're not good at storytelling, you can definitely learn this skill both from writing and talking, doing presentations. Fundamentally, PR people craft narratives for a company that they then sell to the market to help build reputation. The storytelling piece is definitely a skill that can be learned.</p>
      <p>The final thing on PR person's attributes is, definitely you need to love the work and work hard. This job is almost like a lifestyle in many ways because the news cycle is 24-7 across the world. If you're in a high-impact, sexy company with lots of news and developments, you need to be working and thinking about work as much as you can.</p>
      <p>That sounds quite intimidating because we're programmed to have a nine-to-five attitude. But in the PR space, you definitely need to approach it more like a project that goes beyond regular hours. There are times in the PR profession where you are constantly working, like around important events or during crises, and you have to love to work.</p>
      <p>But at the same time, there are going to be times when it's not busy, things are moving slower, and you'll have more slack and opportunity. But it's also a time to think about new initiatives and new ideas and be creative.</p>
      <p>It's definitely one of the more stressful fields to get into. But if you like doing it, then it won't really feel stressful.</p>
      <p>So, those are things I think you should look at in terms of hiring a PR person and the attributes that I would look for when looking at a PR role.</p>
    `
  },
  {
    slug: "first-pr-hire",
    title: "Key Qualities for Your First PR Hire",
    content: `
      <h2>Key Qualities for Your First PR Hire</h2>
      <p>Hey guys, it's Alex with a new video today. So today I'm just going to talk about something that I think could help possibly for startup companies or founders looking to bring in their first PR hire.</p>
      <p>And basically, I've worked in many PR roles, I've been interviewed for PR roles, and I've kind of made a collection of what I think are some of the attributes required for a PR person. So hopefully these can kind of help you if you're thinking about either hiring a person in-house or hiring an agency or looking at getting some expertise.</p>
      <p>And the first thing I would say is: You know, obviously you want to find someone that has both high IQ and high EQ. And especially I want to talk about the latter in terms of EQ because, you know, of course IQ is important, especially when you're hiring for a role where the product is super technical.</p>
      <p>So, for example, right now a lot of companies are hiring PR people for AI products and services, and you know, AI products and services are fundamentally extremely complex because usually they employ some kind of technology, be it like a model or some kind of new algorithm or something like that, and that's super technical for most people.</p>
      <p>So, obviously, the higher IQ you have in terms of like understanding the product or service. But definitely more important for a PR person is having that EQ because they're possibly out of any role in the marketing department, the one that has to have that kind of emotional ability to interact with all the stakeholders be it internal or external.</p>
      <p>So in PR, some of the most crucial aspects of the job are media relations where you're talking to journalists. That requires a large network of journalists. You've got to keep them happy, interact with them, and put up with ups and downs of journalists which typically is the case. And then secondly, the crisis aspect. If you have a crisis situation, the PR person needs to have the emotional intelligence to be able to deal with this situation and deal with that crisis effectively.</p>
      <p>So first point in terms of PR attributes definitely high IQ and more importantly, high EQ.</p>
      <p>Second thing I would say is, you need to have a passion for news. It sounds obvious but in PR you're working with media, you've got to keep an eye out in terms of news for content and you have to be able to understand the news cycle. All that kind of thing. So you have to have a passion for news and I think that's personally kind of what inspired me to move into the PR field - I love reading news every day, consuming news.</p>
      <p>So I would say also the third thing I would say is definitely got to have a low ego. So you know many times in your PR job, you're going to be rejected internally. You might be pitching projects, pitching ideas. Those are going to be rejected frequently, and then externally, you're going to be pitching journalists, pitching partners, again, going to be rejected.</p>
      <p>You have to be willing to be rejected, and have that kind of low ego humility that's going to get you far in the job. And there's been so many times when I met with prospective partners and journalists, and I've been pitching stuff, and it hasn't hit first time, but then maybe six twelve months down the line it does land and you can get what you want. But it stems back to that low ego thing, and that's difficult in marketing because a lot of people in marketing have naturally high egos to start with.</p>
      <p>I think the fourth thing I'm going to say is the person needs to have sort of a taste or an ability to curate because if you think about a company, there's so much noise and potential stories, potential content, potential things you can talk about, and PR's person's job is to sort through it all and basically curate the stuff that really matters, that's going to really drive pickup in media or reputation or all that kind of thing.</p>
      <p>So, the person needs to understand how to curate content both from internal and external sources and be able to really have a discretion for what's good and what's not good and that kind of takes time but also it's like a natural innate thing I think as well.</p>
      <p>I would say the person needs to be a good storyteller and understand storytelling. I mean that's kind of fundamental, so if you're not good at storytelling, like off the bat, you can definitely learn this skill both from writing and obviously talking, doing presentations.</p>
      <p>I mean that's fundamentally what PR people do - they craft narratives for a company that they then sell to the market and it helps build reputation. So the storytelling piece is definitely the skill that can be learned and the better you are, the better your prospects are in terms of success in the field.</p>
      <p>The final thing I'm just going to say on PR person's attributes is, definitely you need to love the work and work hard. Like this job is almost like a lifestyle in many ways because the news cycle is 24-7 across the world and if you're in a high-impact, sexy company with lots of news and developments, and always on the go, then you kind of need to be working and think about work as much as you can.</p>
      <p>That sounds quite intimidating because we're kind of programmed to have a nine-to-five attitude. But I think in the PR space, you definitely need to approach it more like this is going to be a project that's beyond regular hours. And there's times in the PR profession where you are constantly working, like if it's around an important event or the company is in a certain situation, like going public, or there's some kind of price crisis then you're going to be working a lot, and you have to love to work.</p>
      <p>But at the same time, there's going to be times when it's not busy, like things are moving slower, and then you'll have more slack and opportunity. But it's also a time to kind of think about new initiatives and new ideas and being creative.</p>
      <p>So it's definitely I think most people would agree is one of the more stressful fields to get into. But if you like doing it, then it's not gonna really feel stressful.</p>
      <p>So, yeah, those are things I think you should look at in terms of hiring a PR person and the attributes that I would look at when looking at a PR role.</p>
    `
  },
  {
    slug: "hiring-pr-agency",
    title: "Hiring a PR Agency",
    content: `
      <h2>Hiring a PR Agency</h2>
      <p>Hi guys, it's Alex back with another video today. I'm just gonna do a quick video on what I think is probably the most searched for/talked about issue with PR and PR agencies online. I see this over and over again on the Reddit PR subreddit and the same question gets asked and there's not like a clear answer to this.</p>
      <p>I just want to give you my take on kind of four things I think that are solid reasons why you should hire a PR agency.</p>
      <p>The thing with PR agencies, and I guess marketing agencies in general, is there's so many variables like which market you're in, what your budget is, what stage of development your company is at, and there's many variables at play. So, there's no like one-size-fits-all answer, but I think these four things can be kind of broadly applied to any company considering hiring a PR agency.</p>
      <p>I think the first one is like if you're starting a company and you're not a marketing person or a PR person - you don't really know what you're doing, that kind of makes them stand out in the crowd. I mean it sounds kind of obvious, but you know if you're especially in physical products, if you're making a product and selling it, the chances are someone else is already there in the market at a similar price point with a similar product, and there's very few revolutionary products.</p>
      <p>So having a PR firm can (or even a freelancer) can pull out so many angles that you'd never thought before in your team in-house, and then can get you that killer piece of coverage or backlink or whatever it is you need to really light a fire under your brand, and then it can take off.</p>
      <p>You see this kind of happen online a lot with certain products. They might be kind of chugging along for a couple years and then something kind of really lights fire. I think one example is Tom's Shoes. I watched a documentary and I think Tom's Shoes was kind of chugging along for two years, selling a few pairs of shoes. But what really made the difference was the one-for-one concept, where they would give away a pair of shoes for every pair bought. And I believe there was something behind the scenes that kind of really propelled them to fame based on that story angle.</p>
      <p>The second thing I think is that you know when you set up a company as a founder, you've got an email address your name at your company.com, and then you set up probably a support email address for customer support. More often than not, companies set up a press inbox and this press inbox, if you're successful, will fill out very quickly and you as a founder are already dealing with customer support stuff.</p>
      <p>So you need people to help you sort through all of these inquiries from journalists, panelists, partners, whoever, and then set up a proper process and manage that. That's just one example of what a PR firm does - they also do copy, strategy, creative, there's so many things they can add value to being a third party.</p>
      <p>Don't underestimate the level of support you require, especially for brands that are targeting like viral kind of launch or fast growth, and a lot of these VC-backed companies need to hit targets and PR is a vital part of that strategy.</p>
      <p>The third thing is you will have a big crisis - every company has a big crisis at various stages of their company, and crisis management is one of these things that kind of makes or breaks your business.</p>
      <p>You see it so many times - companies fail because they haven't managed a crisis properly. There's been so many examples of this in different spaces, like the Tesla example when Elon Musk had to go and sleep in the factory, that kind of made the company because it pulled everyone towards the mission and everyone was working really hard to ship these cars and ultimately it helped them be successful.</p>
      <p>Similarly, there's companies that haven't managed a crisis well and it's essentially killed the company, and there's lots of examples of these.</p>
      <p>If you're running the business, your focus is on managing people, retaining people, hiring people, getting more capital, all this kind of stuff. So think about that when you're standing in the market, is there someone who's going to help you kind of generally manage your market and PR.</p>
      <p>So these are the reasons why you hire a PR firm. As I said at the start, there's many variables but when I see these questions over again like "Why do I need to hire a PR firm?" or "I wasted so much money on a PR firm" - you've really got to think through what exactly we need, and then find the right people, find the right person, in order to have a good outcome.</p>
    `
  },
  {
    slug: "client-relationships",
    title: "Client Relationships in PR",
    content: `
      <h2>Client Relationships in PR</h2>
      <p>Hi guys, it's Alex back with another video. So someone actually asked me quite recently, how do you kind of work with clients in an agency setting, freelance and whatnot.</p>
      <p>I kind of thought about this question because there's this traditional view of the agency-client relationship where a client comes, an agency does a pitch. It's a really big pitch in front of a big room of people. There's a PowerPoint, there's a hundred slides and they promise the world, they're going to say, "we're going to put you on the cover of Forbes magazine" and you're going to have all this amazing sales and brand recognition - that's the pitch phase.</p>
      <p>And then after the client gives the agency the job, essentially the agency gives that client work to an account executive, and that executive has got like three or four or five other accounts. So essentially you're watering down the whole thing from the pitch phase. And in the end, things fizzle out and then the client switches out the agency after a year.</p>
      <p>That's kind of the common historical way the agency-client relationship goes. And I think these days, things are becoming a lot simpler because we're seeing agencies, especially the big agencies, separate the technology teams - they're basically unbundling the whole kind of full-service agency model.</p>
      <p>For me, I just want to share how I work with clients and hopefully that can help you work with clients on the PR side. The first thing I would say is, when I interact with a client, obviously I have a pitch deck, I tell the client about my resources. Typically clients, the first thing they're concerned about when they outsource something from the company is, will this company be able to handle the work? And it all comes down to resources.</p>
      <p>So for me, if I'm doing freelance PR work, I'm honest to the client, say, here's my resources. Like, here's all the things I can do for you, from content creation to media relations, etc. I put a list out and then I let them see what's on offer.</p>
      <p>If I'm fortunate to get the work, my next step after the onboarding phase would be building a content calendar. The content calendar doesn't have to be like a year or some crazy big complicated calendar. It can be fairly short - six months, and fairly simple because at this stage, what you're doing is trying to map out the client's information, their roadmap for their products and business with an editorial calendar.</p>
      <p>You map out "it's Christmas here, it's summer here, it's this holiday, that holiday, it's this event" and then you map out all of the topics and content around those. That process is fairly incomplete until you can go to the next stage.</p>
      <p>The next stage is, you've got to talk to the client and introduce them to topics that they already know. If you're working with, for example, a camera brand, the client's going to know what the next product is going to be, and the events and news cycle around cameras. They're going to know there's a camera event here, or that this particular manufacturer releases all of their products then.</p>
      <p>Essentially what you're doing is trying to marry your content calendar around the client's expertise, pulling in some of their knowledge. It's a warm-up phase for the next point, which is once you've got a content calendar, once you understand the client's knowledge, then you can really hit home and say, "here's the main perspective, here's the main points of view that I as a PR person can then take and actually craft topics and potentially pitches."</p>
      <p>So the client will give you information. You can then mold these into perspectives, points of view, and then put them in a calendar. For example, there's a camera exhibition coming, and by the way, the client says we have a new technology coming out just two months before - perfect, we can write some media pitches around this new technology ahead of that event.</p>
      <p>What you have then is a framework that you can replicate across not just that six-month calendar but future calendars for the client. The client will know then, "oh this month is going to be a trend story, this month will be an event" - you can start to map out with the client a repeatable content schedule that they are comfortable with and understand.</p>
      <p>From their perspective, instead of you pulling information from them, they're giving it to you. You have the calendar, they give you information, you craft the calendar and then go to the media and develop the PR strategy from there.</p>
      <p>Once everything's set up, you have a content calendar, you have push-pull, I think the thing that a lot of agencies fail with, especially the big agencies, is they sign the clients, they have a team in place, they do the work, things are pretty good overall, they're delivering results and the clients are fairly happy.</p>
      <p>The thing that separates the really top PR people and agencies is that they have this ability to always be present with the client, and be in contact with a client. It's kind of difficult at scale if you have a lot of clients to manage all the relationships.</p>
      <p>Internally in agencies, they have account managers whose job it is to retain the clients, but if you own your own agency or you are in a particular field where you have a deep network, I think the best thing you can do is literally just talk to the client's perspective, the customer's clients, past clients - continually engage as if you're an advisor, essentially give away knowledge for free in many cases.</p>
      <p>And what that does is it keeps you top of mind with clients but at the same time it keeps your mind sharp in terms of future work. So in the case of a client or an ex-client or a new client coming to you urgently with a proposal, and you having to turn this around, you're ready - you have the knowledge, the information, the pitches, the target media, everything is already in place.</p>
      <p>So the way I see it, in terms of the way of being as a PR person and how agencies really should run, the days of getting multi-year big fat contracts are over now. AI is in the scene, clients are increasingly going direct with HR, ecom, and whatever social media platform.</p>
    `
  }
];

const CourseLesson: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const lesson = courseLessons.find(l => l.slug === slug);
  
  if (!lesson) {
    return <Navigate to="/course/introduction" replace />;
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: lesson.content }} />
      </CardContent>
    </Card>
  );
};

export default CourseLesson;
