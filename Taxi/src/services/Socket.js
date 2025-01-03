import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {io, Socket} from 'socket.io-client';
import {DOMAIN_URL} from '../constants';

let myToken = '';

let TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjJmM2QwZTZlNjg1MjQ5MzcxMjI2OGQiLCJlbWFpbCI6ImphZ2FuMTIzQHlvcG1haWwuY29tIiwidHlwZSI6IlVzZXIiLCJpYXQiOjE3MTQzNzE4NjEsImV4cCI6MTcxNDQ1ODI2MX0.6nF-jDTjRAyQgJWlqBDMl5vFtKuout0MUWqiDcANL5M';
// console.log(global.tok,"[][][f;gp");
// const serverUri = `http://153.92.4.13:5353/?token=${global.tok}`;
// const serverUri = 'https://prod-api.footytictactoe.com';
// let token = await AsyncStorage.getItem("token");
// console.log(token,"-=-=");
// let TOKEN = token;
const socket = (name, token) =>
  io(`${DOMAIN_URL}?token=${token}`, {
    auth: {
      token: token,
    },
    query: {
      // username: name,
      token: token,
    },
  });
console.log(socket(), '=---=-=societ');

export default socket;
