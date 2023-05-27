const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
const cors = require('cors');
app.use(cors());

app.listen(process.env.PORT, () => {
    console.log(`Server Started at http://localhost:${process.env.PORT}`)
})

app.get('/', (req, res)=>{
    res.send({message: "bienvenue dans le serveur de by-ndeyaa"});
})

app.post('/api/commander', (req, res) => {
    // recuperer les informations du formulaire
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var tel = req.body.tel;
    var adresse = req.body.adresse; 
    var article = req.body.articleSelected;
    var email = req.body.email;

    var client = `<strong>Nom:</strong> ${firstName}<br><strong>Prenom</strong>: ${lastName}<br><strong>Tel:</strong> ${tel} <br><strong>Email:</strong> ${email} <br><strong>Adresse:</strong> ${adresse}<br>`;
    var article_ = `<strong>Article:</strong> ${article}<br>`;
    var messageMail = "Bonjour,<br><br> La commande suivante a été passée :<br><br>" + client + article_ + "<br><br>Bien cordialment<br>Bot-By-Ndeyaa pour vous servir :)";

    var greeting = `Bonjour M/Mme ${firstName} ${lastName},<br><br>`
    var messageMailConfirmation = greeting +"Votre commande pour le tableau" + ` <strong>${article}</strong>` + " de chez <strong>By-Ndeya</strong> a été bien reçue.<br><br>On vous contactera pour discuter des modalités de livraison.<br><br>Bien cordialement<br>By-Ndeyaa";

    var botMail = 'botbyndeyaa@gmail.com';
    var recepComMail = 'mayelthiam81@gmail.com'//'niassndeyefatou649@gmail.com';
    // faire l'envoi des données par mail
    if(!(firstName==="" || lastName==="" || adresse==="" || tel==="")){
        let transporter = nodemailer.createTransport({  
            host: 'smtp.gmail.com',
            port: 587, // 587 -> TLS & 465 -> SSL
            auth: {  
              user: botMail, // email de votre votre compte google
              pass: 'tnjupodthtykffjx' // password de votre compte google
            }  
        });
    
        let mail = {  
            from: botMail,  
            to: recepComMail,  
            subject: 'Nouvelle commande !',  
            html:`<html>` + messageMail + `</html>`
            // on peut remplacer l'attribut `text`par `html`si on veut que le cors de notre email supporte le HTML
            // html:  '<h1>This email use html</h1>'
          };
    
        transporter.sendMail(mail, (error, info) => {  
            if (error) {  
                console.log(error);  
                res.send({message: "error"});
            } else {  
                console.log('Email: ' + info.response);  
                res.send({message: "mail sent successfully"});
            }  
        });

        let mailConfirmation = {  
            from: botMail,  
            to: email,  
            subject: 'Votre commande a été reçue :)',  
            html:`<html>` + messageMailConfirmation + `</html>`
            // on peut remplacer l'attribut `text`par `html`si on veut que le cors de notre email supporte le HTML
            // html:  '<h1>This email use html</h1>'
          };
    
        transporter.sendMail(mailConfirmation, (error, info) => {  
            if (error) {  
                console.log(error);  
                res.send({message: "error"});
            } else {  
                console.log('Email: ' + info.response);  
                res.send({message: "mail sent successfully"});
            }  
        });
        
    } else{
        res.send({message: "an important field is empty !"})
    }

})