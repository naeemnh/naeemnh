import style from "./style.module.css";

export default function ContactForm() {
  function handleContactFormSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.preventDefault();
  }

  return <form className={style.contact_form}>
    <input placeholder="Full Name" />
    <input placeholder="Subject" />
    <textarea placeholder="Message"/>
    <button type="submit" onClick={handleContactFormSubmit}>Submit</button>
  </form>
}