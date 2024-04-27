const email = document.querySelector('#email');
const contact = document.querySelector('#contact');
const name = document.querySelector('#name');

function emailSend()
{
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "bailkarshreyas@gmail.com",
        Password : "D9E4D211ABC21F06545E66D34C04E8A59E68",
        To : 'shreyasbailkar01@gmail.com',
        From : email.value,
        Subject : "This is the subject",
        Body : "Name: " + name.value + "<br> Email: " + email.value + "<br> Contact: " + contact.value
    }).then(
      message => alert(message)
    );
}