import cors from 'cors';
import config from 'config';
import express from 'express';
import mongoose from 'mongoose';
import checkAuth from './utils/checkAuth.js';

// AUTH
import * as Auth from './routes/auth/auth.routes.js';
import * as AuthValidation from './routes/auth/auth.validation.js';
// Websites
import * as Websites from './routes/websites/websites.routes.js';
import * as WebsitesValidation from './routes/websites/websites.validation.js';
// Templates
import * as Templates from './routes/templates/templates.routes.js';
import * as TemplateValidation from './routes/templates/templates.validation.js';
// Sections
import * as Section from './routes/sections/sections.routes.js';
import * as SectionValidation from './routes/sections/sections.validation.js';
// Legals
import * as Legals from './routes/legals/legals.routes.js';
import * as LegalsValidation from './routes/legals/legals.validation.js';
import * as Legal_content_API from './routes/legals/API/legals.api.routes.js';
// OfferOwner
import * as OfferOwner from './routes/offerOwner/offerOwner.routes.js';
import * as OfferOwnerValidation from './routes/offerOwner/offerOwner.validation.js';
// Offers
import * as Offer from './routes/offers/offers.routes.js';
import * as OffersValidation from './routes/offers/offers.validation.js';
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

const PORT = process.env.PORT || 8080; //config.get('port') -> 4000

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

// Websites
app.get('/api/websites', checkAuth, Websites.getAll);
app.post('/api/websites', checkAuth, WebsitesValidation.create, Websites.create);
app.patch('/api/websites/:id', checkAuth, WebsitesValidation.update, Websites.update);
app.delete('/api/websites/:id', checkAuth, Websites.remove);

app.patch(
    '/api/websites/enabled/:id',
    checkAuth,
    WebsitesValidation.updateOne,
    Websites.updateEnabledOne,
);
app.patch('/api/websites/group/update', checkAuth, Websites.groupUpdate);
// ./Websites

// Templates
app.get('/api/templates', checkAuth, Templates.getAll);
app.post('/api/templates', checkAuth, TemplateValidation.create, Templates.create);
app.patch('/api/templates/:id', checkAuth, TemplateValidation.update, Templates.update);
app.delete('/api/templates/:id', checkAuth, Templates.remove);
app.patch('/api/templates/group/update', checkAuth, Templates.groupUpdate);
// ./Templates

// Sections
// app.get('/api/sections', checkAuth, Section.getAll);
// app.post('/api/sections', checkAuth, SectionValidation.create, Section.create);
// ./Sections

// Legals
app.get('/api/legals', checkAuth, Legals.getAll);
app.post('/api/legals', checkAuth, LegalsValidation.create, Legals.create);
app.patch('/api/legals/:id', checkAuth, LegalsValidation.update, Legals.update);
app.delete('/api/legals/:id', checkAuth, Legals.remove);
app.patch('/api/legals/enabled/:id', checkAuth, Legals.updateEnabledOne);
app.patch('/api/legals/group/update', checkAuth, Legals.groupUpdate);
// == API ==
app.get('/api/legal/content/:id', Legal_content_API.getOne);
// == API ==
// ./Legals

// Offer Owner
app.get('/api/offer-owner', checkAuth, OfferOwner.getAll);
app.post('/api/offer-owner', checkAuth, OfferOwnerValidation.create, OfferOwner.create);
app.patch('/api/offer-owner/:id', checkAuth, OfferOwnerValidation.update, OfferOwner.update);
app.delete('/api/offer-owner/:id', checkAuth, OfferOwner.remove);
// ./Offer Owner

// Offers
app.get('/api/offers', checkAuth, Offer.getAll);
app.post('/api/offers', checkAuth, OffersValidation.create, Offer.create);
app.patch('/api/offers/:id', checkAuth, OffersValidation.update, Offer.update);
app.delete('/api/offers/:id', checkAuth, Offer.remove);
// ./Offers

// Users
app.get('/api/users', checkAuth, Users.getAll); //checkAuth
// ./Users

// User
app.get('/api/profile', checkAuth, User.profile);
app.post('/api/user', checkAuth, UserValidation.create, User.create);
app.patch('/api/user/:id', checkAuth, UserValidation.update, User.update);
app.delete('/api/user/:id', checkAuth, User.remove);
// ./User

// Roles
app.get('/api/roles', checkAuth, Roles.getAll);
app.post('/api/roles', checkAuth, RolesValidation.create, Roles.create);
app.patch('/api/roles/:id', checkAuth, RolesValidation.update, Roles.update);
app.delete('/api/roles/:id', checkAuth, Roles.remove);
// ./Roles

// Language
app.get('/api/language', checkAuth, Language.getAll);
app.post('/api/language', checkAuth, LanguageValidation.create, Language.create);
app.patch('/api/language/:id', checkAuth, LanguageValidation.update, Language.update);
// ./Language

start();
