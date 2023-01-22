import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  var [valeur, INPUT] = useState("");
  
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: valeur }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.cont}>
        <Head>
          <title>CHATBOOT</title>
          <link rel="icon" href="/icon.png" />
        </Head>

        <main className={styles.main}>
          <div className={styles.msg}>
            <div className={styles.robot}>
              <img src="/icon.png" className={styles.icon} />
            </div>
            <div className={styles.corner}>
              <div className={styles.right}><span className={styles.span}>You: </span>{valeur}</div> <br/>
              <div className={styles.left}><span className={styles.span}>Blau: </span>{result}</div>
            </div>
          
          </div>

          <form className={styles.form} onSubmit={onSubmit}>
            <input
              className={styles.input}
              type="text"
              name="animal"
              placeholder="Nouveau Message"
              value={valeur}
              onChange={(e) => INPUT(e.target.value)}
            />
            <input className={styles.reply} type="submit" value="Send" />
          </form>
        </main>
      </div>
    </div>
  );
}
