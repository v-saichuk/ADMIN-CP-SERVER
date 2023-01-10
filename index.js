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
// Landing
import * as Landing from './routes/landing/landings.routes.js';
import * as LandingSection from './routes/landing/sections/landing.section.routes.js';
import * as LandingField from './routes/landing/fields/landing.fields.routes.js';
// Templates
import * as Templates from './routes/templates/templates.routes.js';
import * as TemplateValidation from './routes/templates/templates.validation.js';
import * as TemplateSection from './routes/templates/sections/template.section.routes.js';
import * as TemplateField from './routes/templates/fields/template.fields.routes.js';
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

// Landing
app.get('/api/landings', checkAuth, Landing.getAll);
app.post('/api/landing', checkAuth, Landing.create);
app.patch('/api/landing/:id', checkAuth, Landing.update);
app.delete('/api/landing/:id', checkAuth, Landing.remove);
app.patch('/api/landing/status/:id', checkAuth, Landing.updateEnabledOne);

app.patch('/api/landing/group/update', checkAuth, Landing.groupUpdate);

app.post('/api/landing/section/action', checkAuth, LandingSection.create);
app.patch('/api/landing/section/action', checkAuth, LandingSection.update);
app.patch('/api/landing/section/delete', checkAuth, LandingSection.remove);

app.post('/api/landing/field/action', checkAuth, LandingField.create);
app.patch('/api/landing/field/update', checkAuth, LandingField.update);
app.patch('/api/landing/field/delete', checkAuth, LandingField.remove);
app.patch('/api/landing/field/position', checkAuth, LandingField.position);
// ./Landing

// Templates
app.get('/api/templates', checkAuth, Templates.getAll);
app.patch('/api/templates/group/update', checkAuth, Templates.groupUpdate);

app.post('/api/template', checkAuth, TemplateValidation.create, Templates.create);
app.patch('/api/template/:id', checkAuth, TemplateValidation.update, Templates.update);
app.delete('/api/template/:id', checkAuth, Templates.remove);

app.post('/api/template/section/action', checkAuth, TemplateSection.create);
app.patch('/api/template/section/action', checkAuth, TemplateSection.update);
app.patch('/api/template/section/delete', checkAuth, TemplateSection.remove);

app.post('/api/template/field/action', checkAuth, TemplateField.create);
app.patch('/api/template/field/update', checkAuth, TemplateField.update);
app.patch('/api/template/field/delete', checkAuth, TemplateField.remove);
app.patch('/api/template/field/position', checkAuth, TemplateField.position);

// ./Templates

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
