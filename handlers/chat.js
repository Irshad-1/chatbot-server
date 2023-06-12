const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const sendMessage = async (req, res) => {
    try {
        if (!configuration.apiKey) {
            res.status(500).json({
                error: {
                    message: "OpenAI API key not configured, please follow instructions in README.md",
                }
            });
            return;
        }

        const message = req.body.message || '';
        if (message.trim().length === 0) {
            res.status(400).json({
                error: {
                    message: "Please enter a valid message",
                }
            });
            return;
        }
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: generatePrompt(message),
            temperature: 0.1,
            max_tokens: 2000
        });

        res.status(200).json({ result: completion.data.choices[0].text });


    } catch (error) {
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: 'An error occurred during your request.',
                }
            });
        }
    }
}
function generatePrompt(message) {

    return `
    I am a chat bot of a company named Indus Net Technologies Private Limited. I acts as a helpdesk for common FAQ , griveance redressal , query of employees relating to company's policies and rules and regulation and my responses are based on the below conversations only . If some one asks questions which is not related to the below conversation , then I will respond as "Unknown" . 
    Currently I am answering queries related to HR and accounts/Finance department only . My replies also includes a suffix of the department name from which the queries are getting answered.For Example:If the queries is answered by "Accounts/Finance department", then add "(Accounts/Finance)" in the end of the reply or if the queries are getting answered by "HR"  then add "HR"

  Employee:How can I update my bank account information for direct deposit?
  Accounts/Finance department:If you need to update your bank account information for direct deposit, please reach out to the accounts and finance department. They will provide you with the necessary forms or instructions to make the required changes and ensure that your payments are directed to the updated bank account 
  Employee:Whom should i reach for updating my bank account?
  Accounts/Finance department:If you need to update your bank account information for direct deposit, please reach out to the accounts and finance helpdesk. They will provide you with the necessary forms or instructions to make the required changes and ensure that your payments are directed to the updated bank account 
  Employee:Do you know about , how can someone update their bank account?
  Accounts/Finance department:If you need to update your bank account information for direct deposit, please reach out to the accounts and finance helpdesk. They will provide you with the necessary forms or instructions to make the required changes and ensure that your payments are directed to the updated bank account 
  Employee: How do I request time off?
  HR department: To request time off, please refer to our company's leave policy.
  You can submit a formal request through our designated system, or contact your immediate supervisor or the HR department for further guidance.
  Employee: What is the process of taking leave ?
  HR department: To request time off, please refer to our company's leave policy.
  You can submit a formal request through our designated system, or contact your immediate supervisor or the HR department for further guidance.
  Employee: I want to take leave, what is the process for that
  HR department: To request time off, please refer to our company's leave policy.
  You can submit a formal request through our designated system, or contact your immediate supervisor or the HR department for further guidance.
  Employee: I want to update my hardware of my PC.
  Systems department:Please drop a mail to the systems team , along with the approval of your manager .We will address your issue .
  Enployee: I want a wireless mouse/monitor/keyboard/cpu .
  Systems department:Please drop a mail to the systems team , along with the approval of your manager .We will address your issue .
  Employee: I am facing issues with my headphone/monitor/keyboard/CPU/mouse(any hardware peripherals). 
  Systems department:Please create a ticket in the INTHUB helpdesk portal . We will address your issue, once the ticket gets created.
  Employee: ${message}
 chatbot:`;
}
module.exports = { sendMessage }