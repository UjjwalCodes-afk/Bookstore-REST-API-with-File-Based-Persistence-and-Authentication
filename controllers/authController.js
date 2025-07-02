import express from 'express';
import jwt from 'jsonwebtoken';
import {v4 as uuid} from 'uuid';
import { readJSON, writeJSON } from '../services/fileStore.js';
import argon from 'argon2';
const USERS_FILE = 'users.json'

export const register = async(req, res) => {
    try {
        const{email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message : 'Invalid credentials'});
        }
        const users = await readJSON(USERS_FILE);
        if(users.find((u) => u.email === email)){
            return res.status(409).json({mesage : 'User already exists'});
        }
        const hashed = await argon.hash(password);
        const user = {id : uuid(), email, password : hashed};
        users.push(user);
        await writeJSON(USERS_FILE, users);
        return res.status(201).json({message : 'User is created', user});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : 'Internal server error'});
    }
}

export const login  = async(req , res) => {
    try {
        const {email, password} = req.body;
        const users = await readJSON(USERS_FILE);
        const user = users.find((u) => u.email === email);
        if(!user) return res.status(401).json({message : 'Invalid credentials'});
        const match = await argon.verify(user.password,password);
        if(!match){
            return res.status(401).json({message : 'Invalid credentials'});
        }
        const token = jwt.sign({id : user.id, email : user.email}, process.env.JWT_SECRET, {expiresIn : '1d'});
        res.status(200).json({message : 'User is login successfully', token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : 'Internal server error'});
    }
}