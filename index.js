import cors from 'cors';
import config from 'config';
import express from 'express';
import mongoose from 'mongoose';
import checkAuth from './utils/checkAuth.js';
// AUTH
import * as Auth from './routes/auth/auth.routes.js';
import * as AuthValidation from './routes/auth/auth.validation.js';
// USERS
import * as Users from './routes/users/users.routes.js';
// USER
import * as User from './routes/user/user.routes.js';
import * as UserValidation from './routes/user/user.validation.js';
// ROLES
import * as Roles from './routes/roles/roles.routes.js';
import * as RolesValidation from './routes/roles/roles.validation.js';
// LANGUAGE
import * as Language from './routes/language/language.routes.js';
import * as LanguageValidation from './routes/language/language.validation.js';

const PORT = config.get('port') || 4000;

const app = express();
app.use(cors());
app.use(express.json());

const start = async () => {
    try {
        await mongoose.connect(config.get('mongoUri')).then(() => {
            console.log('✅ DB CONECTED!');
        });

        app.listen(PORT, (err) => {
            if (err) {
                return console.log('⛔️ SERVER ERROR =>', err);
            }
            console.log(`✅ SERVER STARTED! PORT => ${PORT}`);
        });
    } catch (err) {
        console.log('⛔️ Server error', err.message);
        process.exit(1);
    }
};
// Auth
app.post('/api/auth/login', AuthValidation.login, Auth.login);
// Users
app.get('/api/users', checkAuth, Users.getAll);
// User
app.get('/api/profile', checkAuth, User.profile);
app.post('/api/user', checkAuth, UserValidation.create, User.create);
app.patch('/api/user/:id', checkAuth, UserValidation.update, User.update);
app.delete('/api/user/:id', checkAuth, User.remove);
// Roles
app.get('/api/roles', checkAuth, Roles.getAll);
app.post('/api/roles', checkAuth, RolesValidation.create, Roles.create);
app.patch('/api/roles/:id', checkAuth, RolesValidation.update, Roles.update);
app.delete('/api/roles/:id', checkAuth, Roles.remove);
// Language
app.get('/api/language', checkAuth, Language.getAll);
app.post('/api/language', checkAuth, LanguageValidation.create, Language.create);
app.patch('/api/language/:id', checkAuth, LanguageValidation.update, Language.update);

start();
