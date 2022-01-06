import NextAuth from 'next-auth';
// import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
// import clientPromise from '../../../utils/mongodb';
// import connectDB from '../../../utils/connectDB';
import db from '../../../utils/db';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
// import EmailProvider from 'next-auth/providers/email';
// import { html, text } from '../../../utils/htmlEmail';
// import nodemailer from 'nodemailer';
import Users from '../../../models/userModel';
import bcrypt from 'bcryptjs';
// import { MongoClient } from 'mongodb';

// connectDB();
export default async function auth(req, res) {
  return await NextAuth(req, res, {
    session: {
      strategy: 'jwt',
      maxAge: 30 * 24 * 60 * 60,
    },
    site: process.env.NEXTAUTH_URL,
    jwt: {
      // A secret to use for key generation (you should set this explicitly)
      // secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
      secret: process.env.SECRET,
      // Set to true to use encryption (default: false)
      encryption: true,
      // You can define your own encode/decode functions for signing and encryption
      // if you want to override the default behaviour.
      // encode: async ({ secret, token, maxAge }) => {},
     
      // decode: async ({ secret, token, maxAge }) => {},
 
    },
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        async authorize(credentials) {
          const email = credentials.email;
          const password = credentials.password;
         //Connect to DB

          //Find user with the email
          await db.connect();  
          const result = await Users.findOne({
            email: credentials.email,
          });
          //Not found - send error res
          console.log(result, email);
          if (!result) {
            await db.disconnect();
            throw new Error('No user found with the email');
          }
          //Check hased password with DB password
          const checkPassword = await bcrypt.compare(
            credentials.password,
            result.password
          );
          //Incorrect password - send response
          if (!checkPassword) {
            await db.disconnect();
            throw new Error('Password doesnt match');
          }
          //Else send success response
          await db.disconnect();
          return {
            name: result.name,
            email: result.email,
            image: result.image,
            id: result._id,
            status: result.status,
          };
        },
      }),
      // OAuth authentication providers
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
      //   EmailProvider({
      //     // server: process.env.EMAIL_SERVER,
      //     server: {
      //       host: process.env.EMAIL_SERVER_HOST,
      //       port: process.env.EMAIL_SERVER_PORT,
      //       auth: {
      //         user: process.env.EMAIL_SERVER_USER,
      //         pass: process.env.EMAIL_SERVER_PASSWORD,
      //       },
      //     },
      //     from: process.env.EMAIL_FROM,
      //   }),
    ],

    pages: {
      signIn: '/login',
      error: '/login',
    },
    // SQL or MongoDB database (or leave empty)

    callbacks: {
      session: async ({ session, user, token }) => {
        console.log('from callback session', user);
        await db.connect(); 
        const resUser = await Users.findOne({
          email: session.user.email,
        });
        if (resUser) {
          session.user.id = resUser.id;
          session.user.status = resUser.status;
        } else {
          const newUser = new Users({
            email: session.user.email,
            image: session.user.image,
            name: session.user.name,
            status: 'user',
            emailVerified: Date(Date.now()),
          });
          await newUser.save();
          const setUser = await Users.findOne({
            email: session.user.email,
          });
          session.user.id = setUser.id;
          session.user.status = 'user';
          console.log('no user');
        }
        console.log(session);
        await db.disconnect();
        return Promise.resolve(session);
        // return session
      },
      jwt: async ({ token, user }) => {
        // console.log('token', token, 'user', user);
        await db.connect();
        if (user) {
          const resUser = await Users.findOne({
            email: user.email,
          });
          await db.disconnect();
          if (resUser) {
            const { accessToken, ...rest } = user;
            token.accessToken = accessToken;
            token.status = resUser.status;
          }
        }
        console.log('token',token)
        return token;
      },
    },
    secret: process.env.SECRET,
  });
}

const loginUser = async ({ password, user }) => {
  if (!user.password) {
    throw new Error('Accounts have to login with OAuth or Email.');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Password Incorrect.');
  }

  //   if(!user.emailVerified){
  //     throw new Error("Success! Check your email.");
  //   }
  return user;
};

const registerUser = async ({ email, password }) => {
  const hashPass = await bcrypt.hash(password, 12);
  //   const newUser = new Users({ email, password: hashPass });
  await newUser.save();
  return (user = newUser);
  //   throw new Error("Success! Check your email.");
};
