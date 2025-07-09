import { betterAuth } from "better-auth";
import {
    polar,
    checkout,
    portal,
} from "@polar-sh/better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schema"
import {polarClient} from './polar'
import { db } from "@/db"; 
 


export const auth = betterAuth({
    plugins:[
        polar({
                client:polarClient,
                createCustomerOnSignUp: true,
                use:[
                    checkout({
                        authenticatedUsersOnly:true,
                        successUrl:"/upgrade",
                    }),
                    portal(),
                ],
        })
    ],
     socialProviders: {
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        },
          google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
    emailAndPassword:{
        enabled: true,
    },

    database: drizzleAdapter(db, {
        provider: "pg",
        schema:{
            ...schema,
        },
    }),
})