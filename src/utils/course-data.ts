export interface VideoLesson {
  id: string;
  title: string;
  videoUrl: string;
  slug: string;
  transcript?: string;
}

export interface CourseChapter {
  id: string;
  title: string;
  lessons: VideoLesson[];
}

export const courseData: CourseChapter[] = [
  {
    id: "chapter-0",
    title: "Full Course",
    lessons: [
      {
        id: "0-1",
        title: "Alex MacGregor's PR Masterclass (Full Video)",
        videoUrl: "https://vimeo.com/1083286083",
        slug: "full-course",
        transcript: "Welcome to Alex MacGregor's PR Masterclass. In this comprehensive video, I'll cover everything you need to know about modern public relations strategies from start to finish."
      }
    ]
  },
  {
    id: "chapter-1",
    title: "Introduction",
    lessons: [
      {
        id: "1-1",
        title: "Introduction",
        videoUrl: "https://vimeo.com/1083271721",
        slug: "introduction",
        transcript: "Hi, my name is Alex McGregor. I'm here today for the self-titled PR Master Class. I was going to call it PR Course, but I feel Master Class is a cooler name and I'm a PR guy after all, so why not? Yeah, it's been great to kind of finally get around to doing this. I've been talking about this for a while, and it 's kind of like it's been on my agenda,  but I just haven't had time to do it. So super grateful to be able to do it now. And yeah, and you know, just super excited to kind of get into it and share some learnings I've had during the years and whatnot with you guys. So let's dive into the course."
      },
      {
        id: "1-2",
        title: "About Alex",
        videoUrl: "https://vimeo.com/1083271531",
        slug: "about-alex",
        transcript: "So a little bit about me. Yeah. My name is Alex. I've worked in PR for the best part of a decade now. Um, and you know, PR is, um, something that's kind of come to me a little bit later, it wasn't my first, uh, job as such. Um, I kind of stumbled into it. I was doing some social media, um, work and then I moved over to PR and I find that they were fairly, uh, similar in some ways and, um, yeah. So that was like a really great opportunity for me to kind of dive into, um, you know, something, something new. And I think for, for PR, it was like a case of, okay, um, I can kind of learn this job on, uh, learn on the job. And I really, um, found that kind of really interesting. And, you know, that kind of led to, you know, basically a decade in, in PR. I worked for various tech companies in house. So, um, you know, I, I did, uh, product PR for, um, a big, uh, consumer tech brand called Oppo. I did corporate PR for another one called OnePlus.\n\nUm, so I've, you know, I've worked with, uh, PR software companies. I've worked with agencies. So I have a lot of, uh, kind of experience across the board. Fast forward to today. Now I run my own PR agency and I'm building, um, AI PR tools. So that's just a bit about me from a professional perspective and, you know, why I put this course together. I think like a lot of people that, you know, put courses together, um, it came down to the fact that I had lots of, uh, opinions and ideas that I'd shared over the years on, um, on social. So I shared, um, you know, a lot of these on social and my newsletter and, you know, the more I thought of it, I looked at other people, um, with, with courses and SEO and digital marketing and, um, and, and the creative side and whatnot. So I thought, you know, why not, um, you know, uh, do a course myself and I gathered all my notes together and then I kind of realized, okay, you know, I have, um, something that could be a course.\n\nAnd, um, what I want to do with this course was I didn't want to make it like super, super like long, like you see some, some of these courses like last for, you know, it could be two hours. I w I want to keep the overall content to about an hour of video and I'll provide all the notes, um, on the, on the website so you can look at the video. You can, you can look at the notes and I'll provide all that. Um, and I think that's the best format, you know, think times change people move on and ideas, you know, there's new ideas and, you know, courses can go out of date and whatnot. So I just want to make this as concise as possible, um, you know, given the situation. So last things first on the, on the introduction side, like, I just want to say, like, if you've got any like feedback or any like, um, questions or anything like that, please feel free to drop me an email and, um, you can get my, my, uh, email address, um, and send me any, any questions you have or, or even social, you can reach out to me there. Um, I 'll also, uh, happy to talk PR or anything you guys want to talk about."
      },
      {
        id: "1-3",
        title: "Why PR is More Than Editorial",
        videoUrl: "https://vimeo.com/1083271288",
        slug: "why-pr-more-than-editorial",
        transcript: "So first of all, I want to like set the scene and kind of like preface the whole course by saying, you know, let's look at what PR is today. And if you think about what PR is, um, and if you ask that the average person on the street, they would probably say like PR is like, um, like madmen, you know, it's like, uh, you know, typical kind of ad agency vibe. They're there to cover up. They're there to do propaganda. You know, if you think back to the kind of, um, the height of like the so-called bad industries, like the tobacco industry, oil and gas, nuclear, um, all the, all the frauds and scams and you know, health coverups and all that stuff. PR was heavily involved in that. Like a lot of these big companies retained PR agencies and a lot of the big agencies today were built off the back of that business, um, long before the internet and you know, a lot of the transparency we have today. So when you think about it like that, PR has kind of got a bad rep and it still has a lingering bad rep to a degree, but things are changing, things are changing.\n\nAnd those kind of traditional, um, gatekeepers, you could say, um, you know, from PR agencies and news wires, um, you know, to, you know, the lobbyists, all that kind of stuff, the internet has kind of really changed the way we, um, we look at that, um, from a, from a kind of, uh, overall perspective. And I think also like, um, some of the people that we look at today, they, they don't even bother hiring a PR agency. Like a lot of the, now, the famous founders and celebrities and TikTok, uh, like influencers, they just go direct. They don't even bother having PR. So, you know, you throw all that into the mix. You also talk about like, you know, um, some of the other things like, you know, how do you, um, how do you manage all this with this information and AI? Like there's so much information being pumped out now as well. Um,  it 's a very different field to what it was, you know, years ago.\n\nAnd I think that is, if I could rank like the things on this, this, um, this slide, like in terms of like what's, what's most important today is probably the information flow. The fact that,  you know,  think back to like back in a day when, you know, one story would be written in a newspaper and newspaper will go out and it'd be a couple of days before other newspapers pick up on it. Like the information just moved very slowly. And now like,  we 're just constantly bombarded with information. Like it's, it's crazy the amount of information we have available at our fingertips. It's, it's all around us. Um, and that's basically, you know, change the game for PR. It's made a lot of the things that PR people used to do and agencies, uh, obsolete.  It 's made a lot of the gatekeepers obsolete and it's brought in new people and new forces from, uh, from other areas like social media. So just what does set the scene like that's like a backdrop of kind of where I see PR, um, as it is, uh, in 2025, mid 2025. So, um, yeah, I think that's where we're at with, with PR."
      },
      {
        id: "1-4",
        title: "Starting a Career in PR",
        videoUrl: "https://vimeo.com/1083271029",
        slug: "starting-career-in-pr",
        transcript: "So I want to start this kind of sort of part with like starting a career in PR and the reason I'm talking about this is because I feel like, as I said, it's a very mystique in terms of like, historically very mystique, sort of opaque industry. And for me, when I came into PR, I didn't really know much about it. Like a lot of people, you know, like the actual inner workings of it are not so easy to understand. And for me personally, like I, you know, when I started in PR, I didn't really, I had a boss, but I didn't really have much. Um...  I didn't have much grounding, I didn 't have much information and like books, there's not like a lot of books to kind of work off and there's not a lot of like information out there. So essentially like I had to kind of come up with like, okay, how do I structure my time? How do I, what kind of things that I work on? And slowly, slowly I kind of built that up. And what I would say to anyone looking to start a career in PR is these are kind of some of the things I would recommend.\n\nAnd I think you have to be able to be a news junkie. You know, you don't have to love news, but you need to, you literally need to read a lot of news in PR because not only do you need to focus on your particular industry or company, but you need to look at the global world around us. There's so much interlinked economies and markets now that one thing that happens somewhere in the world is going to affect you in some ways. So for example, right now with tariffs, you know, you can't escape tariffs. And, you know, if I go onto Google news right now, like I can, you know, which I do most days and I recommend, you know, you can see like some of these stories are literally affecting, you know, every industry from, you know, tech to finance, to real estate, politics. Like it's all interlinked and of course AI especially. So I think I recommend, you know, for me anyway, the way I would work is I would go in the morning and check the news, Google news, or, you know, however you get your news, but that is really, really important part of the job. In a way, LinkedIn is social media.\n\nObviously a lot of news is posted on social media, comes from social media. Personally, like I think X and LinkedIn are very, very good. And I'll talk about a little bit more in like why later in this, this chapter, like why I think it's important for hiring people or understanding the good PR person. But that is something else I do. Another thing that's really important is, is networking. So a lot of people might think in certain careers, like salespeople might think another salesperson is a competitor, but I think as a PR person, you should look at other PR people as someone that could help you. And I actually learn a lot from talking to other PR people in different, not only in my industry, but in different industries. So I think that's really, really important and kind of like, it doesn't matter where it's like online email or offline, like it's really interesting. I have a lot of professional friends in PR and you always learn stuff from them. So that's really super important.\n\nAnd then more of like a personal thing, I think I've got here like mastery of rejection, so basically in a career, at a PR career, you're going to be rejected a lot and that's the kind of thing like that is going to happen. So you have to kind of learn to accept it."
      },
      {
        id: "1-5",
        title: "On The Record vs Off The Record",
        videoUrl: "https://vimeo.com/1083270544",
        slug: "on-off-record",
        transcript: "One thing I want to expand upon related to this is the concept of on the record versus off record. I feel like I needed a dedicated chapter on this because because... when I started in PR, no one really explained this concept to me. And I'd heard of the term, but I'd never been told like what it meant or, you know, anything like that. And basically like I found out on the job and, and I will talk about that case study, but a little bit later, but essentially like the way you can look at it is like on the record is, is fair, you know, fair game. And what that means is like, if you assume that everything is on the record, then whatever you say, whatever you write, whatever people could overhear or see is, could be taken as, as, as fact. And that, if you have that kind of mindset, then you can really stay on message a lot easier and you can be more comfortable with, with what you're saying and what you're doing. And I think that's the kind of default way people should look at the media now in general.\n\nAnd like being a public persona, there's just so much, kind of related to the second point, like there's so much technology now and, and you know, people can can hack into things and people can overhear things and basically off the record isn't what it was back in the day. So being off the record is something you, if you are going to be off the record, you need to be very, very sure about that is definitely the case. And those two kinds of concepts are really important. In terms of like leverage,  I do think it 's lost some of the leverage in, in the kind of the PR journalist media founder world. So like a lot of like what is said now is kind of like, there's a lot of memes, for example, there's a lot of humor. There's obviously the, there was all of the kind of wokeism and there was like a lot of different concepts flying around where you're not really sure how to take things. Historically, what people did with, with on the record, off the record was brands and companies would use that as a tool to get press and then vice versa journalists and whatnot could then use that against brands as leverage also to get stories and get scoops.\n\nThat is kind of not as effective, I don't think, as it used to be, but it still is very effective if deployed correctly. And you see it every day. There's many examples every day in politics and business when, you know, different, you know, people leak information to the press and then, you know, they get something bad written about someone else or they get something, you know, interesting written about their brand or talked about their brand. So the concept is still relevant. Um In terms of the, I'll go on to the first timer thing, you know, you have to be very careful if this, you're not used to this concept and, um, that can be back and backfire. Um, but yeah, just to kind of finish up on this topic, you should always kind of treat things as on the record. Um, and then that way you can kind of be sure like where you are.  Um, and that's kind of related to my case study. So in, oh, when was it? Let me check. It was 2018 I attended a conference for the first time for my company, which is a smartphone company called Oppo.\n\nUm,  and essentially what happened was I had some, uh, one-to-one, uh, meet meetups with journalists. And basically at that time I was trying to explain, um, what the company was because not many people heard of the company. Um, and you can see here in the headline, the, the journalists actually wrote in the headline, you've almost certainly never not heard of the world's third largest smartphone company. Um, so, you know, that's, that's really great. Um, that's a cool headline. It's very intriguing. Um, and essentially I had this conversation with the journalist and, you know, he was asking a lot of questions about the ownership of the company. Now, I wasn't really briefed too much on the ownership of the company. I knew, I knew the ownership. I knew it was like a, there was a holding company,  uh,  called BBK and basically that owned another bunch of other companies underneath it. Um, and the word was that we shouldn't really talk about the other companies and, and that was that.  Um,  but you know, essentially what happened here was Mike, um,  he kind of didn 't really ask me about on the record, off the record.\n\nSo I assumed,  um,  a lot of the conversation was off the record, which was actually a mistake. Um, and Mike actually printed some things here. He, he put down some words here that I wasn't happy with after the, after the article went live. So essentially the article went live with a lot of information rather than flattering from my perspective. And obviously I saw this and I was a little bit, uh, yeah, I was, I wasn't panicking, but I was a little bit kind of perturbed. And I took it to my boss and my boss said it's fine. But next time, like, if, uh, you know, if it's clear that he was not stipulating on the record is off the record, or if you feel uncomfortable, just don't comment on anything related to that. And I learned the kind of hard way, um, you know, on the record versus off the record is, is really, really important. And, um, luckily that didn't happen again. I didn't, I didn't have any issues after that, but that was definitely a learning curve for me, um, you know, as a, as a new PR person.\n\nUm, but I have to say after that I still got on very well with the journalist, Mike, and, um, you know, we, we kind of worked together in the future. So I'll go a little bit more into that in, in terms of the relationships with journalists later in the course."
      }
    ]
  },
  {
    id: "chapter-2",
    title: "Hiring And Agencies",
    lessons: [
      {
        id: "2-1",
        title: "Hiring And Agencies",
        videoUrl: "https://vimeo.com/1083270452",
        slug: "hiring-agencies",
        transcript: "So the next chapter is really important and it's kind of related to like starting a career in PR and we're going to look at hiring and agencies. And hiring as in hiring PR people for your team or your company or whatnot and then agencies as in obviously like a team versus you know individual. Slightly different but also slightly similar because at the end of the day it's still core, you're hiring core PR people. The top level, the kind of top line thing is like PR people are usually, um, slightly more EQ than IQ. Um, you want probably a bit of both, but at the same time, um, you know, the EQ thing for me is more important. And I'll talk about that more detail. Um, when I look at the hiring, uh, a PR person, um, news obsessed, we talked about that before, um, and also good at storytelling and curating stories. Agencies we'll go into, um, essentially, you know, you, uh, you don't have time. You don't have resources. You don't have expertise. You need certain, um, help. That's typically why you have an agency.\n\nUm, usually bigger companies have agencies, um, due to the resource constraint, smaller company, and also the scope involved. Um, and then we'll talk a bit, a little bit more about like the vetting of an engineer, uh, vetting PR people like an engineer, um, and like why you need to kind of think about certain things and goals, but, uh, I just wanted to include this photo here, this image, because when people think about an agency, it's very typical, they think of brainstorming. They think about an agency is just about ideas, but actually it's a, it's a lot more than that and, you know, we'll go into detail, detail on that."
      },
      {
        id: "2-2",
        title: "Things That Make a Great PR Person",
        videoUrl: "https://vimeo.com/1083270265",
        slug: "great-pr-person"
      },
      {
        id: "2-3",
        title: "Hiring A PR Agency",
        videoUrl: "https://vimeo.com/1083269942",
        slug: "hiring-pr-agency"
      },
      {
        id: "2-4",
        title: "Client Relationships in PR",
        videoUrl: "https://vimeo.com/1083269791",
        slug: "client-relationships",
        transcript: "We'll move on. We'll talk about client relationships because this is more focused on people who deal with agencies or people inside agencies. And this is important because when you hire an agency, you Obviously, you don't just sort of put down the money and say, hey, like, you know, let's you deliver our work now and then that's it. We'll go off and we'll do our thing. And no, the agency client relationship is really important and most kind of agencies are pitching on resources. So the client will give them like a RFP request for proposal, the other budget or ballpark figure and scope, like scope of work, different markets, for example, and then the agencies will pitch that. Obviously, a big mistake is pitching resources you don't have and you see that quite common. So imagine you're a PR agency and you're pitching this company and then they say, oh, can you do a website? Can you do creative? And a lot of agencies probably just say, yes, yes, yes, we can do it right. We want to get the work. And maybe the better route is to say, no, we're going to be fully focused on media relations or advertising. And you can let other agencies do that work.\n\nBut that's kind of not how it works in the agency world. Like, you know, a lot of agencies want to scoop up as much business as they can. The content calendar piece is. Even though... companies are kind of really competitive and different industries like most industries have a content calendar. So for example in the travel industry or in the cryptocurrency industry or in the tech industry there's like a circuit of events that happen every year roughly but at the same time. So if you can map those out for clients as an agency then that's going to help you. I do talk here about the client expertise some agencies are very very good with specific verticals. You know they might be very good at consumer tech or B2B tech. So they have a very good team and experience in that vertical. So that helps them when business because they're closer to the product. They're closer to the customer. So that often helps. And then just a couple things.\n\nThis is kind of the direction agencies are going in my opinion is with AI and with automation like a lot of the the bigger agencies are struggling if you look at the kind of the financial side the balance sheet and the revenue and obviously the the staff the staffing levels like they're struggling versus the smaller agencies that are adopting AI, adopting automation like they can do more with less and I think in the future like that kind of approach is going to be more viable than the bigger traditional holding companies. So yeah, that's just some thoughts on like I think the relationship between a client and agency partner."
      },
      {
        id: "2-5",
        title: "Case Study",
        videoUrl: "https://vimeo.com/1083269574",
        slug: "hiring-case-study",
        transcript: "So just some quick kind of commentary and case studies from me. I work with some fairly big agencies in my career so far. I picked these three. I have some examples but they're very famous in agency world. Ogilvy, very famous for advertising and creative. Weber-Schanwick, a newer agency but very strong in PR specifically and then Publicis which is now the number one holding company. It's the largest ad agency in the world and I work with these agencies in previous roles and on a freelancer basis. I just saw some commentary. Like I feel when I work with Ogilvy, Ogilvy was very famous for the founder. Um, and the whole, uh, Ogilvy story is like very strong on, um, branding and creative. And I feel like when I work with Ogilvy, like I could tell, like, it was almost like an institution, so they're very much like, when, when you work with them, it was like, as in them, you know, like they're sitting over there, we're sitting over here. They have some ideas. We have some ideas. Um, and it was a kind of difficult working relationship in a way.\n\nUm, very smart people, but at the same time, they're very rigid, I think, in their approach. everything from them comes through the lens of the Ogilvy brand. So they used to come to our office like with everything branded, Ogilvy pen, Ogilvy notebook, all this kind of thing. And I don't know if that still works these days. Like it's obviously they have a great brand, but maybe it's not so much relevant these days. So I don't know. That was a while ago. Weber-Shanwick was really good in terms of like the relationship I have with them and the work we did with them. They're very low ego group, the people. For example, when they came to pitch the company, which was Oppo at the time, the meeting room was full of all the bosses, including the CEO. And the guy walked in and he had like shaggy blonde hair and he started talking. I'm like, God damn, like he's from my hometown. Like I knew within 10 seconds and we were chatting about my hometown and he's become like a mentor to me since then.\n\nBut the whole relationship with them was like very like, you know, collaborative is the word I would use. So they, they wanted to work with the company and they want to understand the company and, and, um, they had a worldwide contract. So they, they did a lot of different work, um, for that brand. I really enjoyed it. I really enjoyed working with them and I feel like they're a very good kind of modern agency benchmark, especially in the PR side. And then finally, just like want to talk on publicists, so I work with them as a freelancer. You can see their website here, Viva La Difrance. I hope my French accent is okay, but they basically the biggest agency now in the world, extremely strong on results. So it was a results driven culture. Uh, they like to talk about the fact they have technology, uh, their own platform. And it's a very kind of similar to Ogilvy in terms like as an institution, but at the same time, they're forward thinking.\n\nAnd I think that's why I took away from them is like, yes, we're a big agency, old company, a hundred year old company, by the same time we're focused on the focus on the future. So for me, like that was a cool thing about publicists. So yeah, if you get a chance to work with these guys, um, you know, highly recommend it and, um, it's good to work with some of the big names, uh, as well as the smaller agencies, um, in the industry."
      }
    ]
  },
  {
    id: "chapter-3",
    title: "Media Relations",
    lessons: [
      {
        id: "3-1",
        title: "Media Relations",
        videoUrl: "https://vimeo.com/1083269527",
        slug: "media-relations"
      },
      {
        id: "3-2",
        title: "Comparing PR Media Databases",
        videoUrl: "https://vimeo.com/1083269461",
        slug: "pr-media-databases"
      },
      {
        id: "3-3",
        title: "Building Strong Media Relationships",
        videoUrl: "https://vimeo.com/1083269350",
        slug: "building-media-relationships"
      },
      {
        id: "3-4",
        title: "Effective Media Pitches",
        videoUrl: "https://vimeo.com/1083269120",
        slug: "effective-media-pitches"
      },
      {
        id: "3-5",
        title: "Case Study",
        videoUrl: "https://vimeo.com/1083268934",
        slug: "media-case-study"
      },
      {
        id: "3-6",
        title: "Influencer Marketing",
        videoUrl: "https://vimeo.com/1083268838",
        slug: "influencer-marketing"
      },
      {
        id: "3-7",
        title: "Mastering Influencer Marketing",
        videoUrl: "https://vimeo.com/1083268604",
        slug: "mastering-influencer-marketing"
      },
      {
        id: "3-8",
        title: "Case Study",
        videoUrl: "https://vimeo.com/1083268437",
        slug: "influencer-case-study"
      }
    ]
  },
  {
    id: "chapter-4",
    title: "Crisis Management",
    lessons: [
      {
        id: "4-1",
        title: "Crisis Management",
        videoUrl: "https://vimeo.com/1083268308",
        slug: "crisis-management"
      },
      {
        id: "4-2",
        title: "Handling a Crisis",
        videoUrl: "https://vimeo.com/1083268181",
        slug: "handling-crisis"
      },
      {
        id: "4-3",
        title: "Top PR Crisis Mistakes to Avoid",
        videoUrl: "https://vimeo.com/1083268052",
        slug: "crisis-mistakes"
      },
      {
        id: "4-4",
        title: "Case Study",
        videoUrl: "https://vimeo.com/1083267991",
        slug: "crisis-case-study"
      }
    ]
  },
  {
    id: "chapter-5",
    title: "Social Media",
    lessons: [
      {
        id: "5-1",
        title: "Social Media Management",
        videoUrl: "https://vimeo.com/1083267943",
        slug: "social-media-management"
      },
      {
        id: "5-2",
        title: "Why Social Media is Essential for PR",
        videoUrl: "https://vimeo.com/1083267859",
        slug: "social-media-essential"
      },
      {
        id: "5-3",
        title: "Ranking Social Media For PR",
        videoUrl: "https://vimeo.com/1083267643",
        slug: "ranking-social-media"
      },
      {
        id: "5-4",
        title: "Optimal Social Media Posting Times for PR",
        videoUrl: "https://vimeo.com/1083267385",
        slug: "optimal-posting-times"
      },
      {
        id: "5-5",
        title: "Mastering Social Media for PR",
        videoUrl: "https://vimeo.com/1083267079",
        slug: "mastering-social-media"
      },
      {
        id: "5-6",
        title: "Case Study",
        videoUrl: "https://vimeo.com/1083266985",
        slug: "social-media-case-study"
      }
    ]
  },
  {
    id: "chapter-6",
    title: "Content Creation",
    lessons: [
      {
        id: "6-1",
        title: "Content Creation",
        videoUrl: "https://vimeo.com/1083266886",
        slug: "content-creation"
      },
      {
        id: "6-2",
        title: "Press Releases in the Age of Social Media",
        videoUrl: "https://vimeo.com/1083266823",
        slug: "press-releases-social-media"
      },
      {
        id: "6-3",
        title: "Case Study",
        videoUrl: "https://vimeo.com/1083266590",
        slug: "content-case-study"
      }
    ]
  },
  {
    id: "chapter-7",
    title: "Getting Creative",
    lessons: [
      {
        id: "7-1",
        title: "Getting Creative",
        videoUrl: "https://vimeo.com/1083266430",
        slug: "getting-creative"
      },
      {
        id: "7-2",
        title: "Unconventional PR Strategies",
        videoUrl: "https://vimeo.com/10832
