
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const from = process.env.SENDGRID_FROM

const templates = { // add the name and id of the templates on your account
    "name-of-template": "id-of-template"
}

// the first argument is the name of the template to use
async function sendTemplate(template, email, data, attachments) {
    if (!templates[template]) {
        return { error: "template doesn't exist" }
    }
    const id = templates[template]
    try {
        const msg = {
            to: email,
            attachments,
            from: from,
            template_id: id,
            personalizations: [
                {
                    to: [
                        {
                            email: email
                        }
                    ],
                    dynamic_template_data: data
                }
            ]
        }
        let result = await sgMail.send(msg)
        return { result }
    } catch (error) {
        return { error }
    }
}

async function sendTemplateMultiple(template, emails, data, attachments) {
    if (!templates[template]) {
        return { error: "template doesn't exist" }
    }
    if(!Array.isArray(emails)){
        return { error: "emails has to be an array of email addresses"}
    }
    const id = templates[template]
    try {
        const msg = {
            attachments,
            from: from,
            template_id: id,
            personalizations: [
                {
                    to: emails.map(email => {
                        return {email}
                    }),
                    dynamic_template_data: data
                }
            ]
        }
        let result = await sgMail.send(msg)
        return { result }
    } catch (error) {
        return { error }
    }
}