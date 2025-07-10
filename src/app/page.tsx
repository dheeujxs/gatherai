import Link from "next/link";
import { ArrowRight, BarChart2, MessageSquare, PlugZap, ShieldCheck, UserCog, Video } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/shared/Header";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const FEATURES = [
  {
  title: "24/7 AI Video Support",
  Icon: Video,
  bg: "bg-blue-100",
  color: "text-blue-600",
  description:
    "Deploy always-available AI agents that handle customer queries via video — day or night.",
},
{
  title: "Instant Human-Like Conversations",
  Icon: MessageSquare,
  bg: "bg-indigo-100",
  color: "text-indigo-600",
  description:
    "Our AI understands tone, context, and intent to deliver lifelike video call experiences.",
},
{
  title: "Customizable Agent Personas",
  Icon: UserCog,
  bg: "bg-pink-100",
  color: "text-pink-600",
  description:
    "Design agents that match your brand — tone, appearance, and even facial expressions.",
},
{
  title: "Real-Time Analytics",
  Icon: BarChart2,
  bg: "bg-emerald-100",
  color: "text-emerald-600",
  description:
    "Get instant insights into call duration, user sentiment, and common queries.",
},
{
  title: "Seamless Integration",
  Icon: PlugZap,
  bg: "bg-yellow-100",
  color: "text-yellow-600",
  description:
    "Easily embed AI video agents into your website, product, or support flow — no code required.",
},
{
  title: "End-to-End Encryption",
  Icon: ShieldCheck,
  bg: "bg-gray-100",
  color: "text-gray-600",
  description:
    "Secure video calls with enterprise-grade privacy and compliance standards.",
}


]

const STEPS = [
  {
    label:"1",
    title:"Create agent",
    description:"Create an agent to start the process"

  },
  {
    label:"2",
    title:"Create meeting",
    description:"Create an meeting to connect with call"

  },
  {
    label:"3",
    title:"Join call",
    description:"Now join the call to connect with agent"

  },
]
const TESTIMONIALS = [
  {
    quote:
      "Ye babu rao ka style hai! With Gather.AI i can conntect with ai and take insight about proety inivisting",
    name: "Babu Rao",
    image: "/testimonials/babubhaiya.png",
    role: "Rental Property Manager",
  },
  {
    quote:
      "Take adavtange of ai meetings and gather and incerse your growth in 25 dyas don't spill the scheme",
    name: "Raju",
    image: "/testimonials/raju.jpg",
    role: "Stock Market Expert",
  },
  {
    quote:
      "If i have the gather i would't be employedd and used gather ai to learn new techs and treans and make raju cry",
    name: "Shyam",
    image: "/testimonials/shyam.png",
    role: "Job Searcher",
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col pt-16">
        <Header/>
      {/* ───── Hero ───── */}
      <section className="mt-20 pb-12 space-y-10 md:space-y-15 px-5">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-6">
          <Badge variant="outline" className="bg-green-100 text-green-700">
            Gather with your AI agent. Face to face.
          </Badge>

          <h1
            className="mx-auto max-w-6xl text-4xl font-black tracking-tight md:text-8xl"
            style={{
              background: "linear-gradient(to right, #16a34a, #22c55e, #4ade80)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "1px 1px 1px rgba(0,0,0,0.05)",
              letterSpacing: "-0.02em",
            }}
          >
            Gather with AI. Talk. Ask. Decide.
          </h1>

          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed">
            Join real-time video gatherings with your personal AI agent — get answers, plan your day, or just talk it out.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row justify-center">
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700"
            >
              <Link href="/dashboard">
                Start a Gathering
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </div>
        </div>

       <div className="container mx-auto max-w-5xl overflow-hidden rounded-xl shadow-xl">
  <div className="relative aspect-[16/9] gradient p-1 rounded-xl overflow-hidden">
    <Image
      src="/landing.png"
      alt="Banner"
      fill
      className="object-contain rounded-lg"
    />
  </div>
</div>

      </section>
      <section id="features" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Badge variant='outline' className="bg-green-100 text-green-700">
            Features
          </Badge>
          <h2 className="mt-2 text-3xl md:text-4xl"  style={{
              background: "linear-gradient(to right, #16a34a, #22c55e, #4ade80)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "1px 1px 1px rgba(0,0,0,0.05)",
              letterSpacing: "-0.02em",
            }} >
                  Everything you need for real-time AI conversations
          </h2>
              <p className="mx-auto mt-3 max-w-[700px] text-gray-500 md:text-xl/relaxed">
              Our platform makes it easy to launch AI agents that talk, listen, and resolve — just like humans.

              </p>
                <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ title, Icon, bg, color, description }) => (
              <Card
                key={title}
                className="flex flex-col items-center space-y-4 p-6 text-center"
              >
                <div className={`rounded-full p-3 ${bg}`}>
                  <Icon className={`h-6 w-6 ${color}`} />
                </div>

                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-gray-500">{description}</p>
              </Card>
            ))}
          </div>
        
        </div>
        

      </section>
        <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Badge variant="outline" className="bg-green-100 text-green-700">
            How It Works
          </Badge>
          <h2 className="gradient-title mt-2 text-3xl md:text-4xl">
          Want to dicuss from ai just follow this smile steps
          </h2>
          <p className="mx-auto mt-3 max-w-[700px] text-gray-500 md:text-xl/relaxed">
            Follow these simple steps to start  your meetings and gathers with ai
          </p>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
            {STEPS.map(({ label, title, description }) => (
              <div key={label} className="flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-600">
                  {label}
                </div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-gray-500 text-center">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
         <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Badge variant="outline" className="bg-green-100 text-green-700">
            Testimonials
          </Badge>
          <h2 className="gradient-title mt-2 text-3xl md:text-4xl">
            What our users are saying
          </h2>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map(({ quote, name, role, image }) => (
              <Card key={name} className="flex flex-col justify-between">
                <CardContent className="space-y-4 p-6">
                  <p className="text-gray-500">{quote}</p>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      {/* Placeholder avatar */}
                      <AvatarImage src={image} alt={name} />
                      <AvatarFallback className="uppercase">
                        {name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="text-sm font-medium">{name}</p>
                      <p className="text-sm text-muted-foreground">{role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
         <section className="py-20 gradient">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl text-white">
            Ready to Gather mettings and talk with ai agent
          </h2>
          <p className="mx-auto max-w-[600px] text-green-400 md:text-xl/relaxed">
            Join thousands of users who are using gather.ai to build
          </p>
          <Button asChild size="lg" className="bg-green-800 hover:opacity-90">
            <Link href="/dashboard">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
