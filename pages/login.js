import Head from "next/head";
import { useState } from "react";
import { FaApple, FaFacebookF } from "react-icons/fa";
import { HiOutlineLockClosed, HiOutlineLockOpen } from "react-icons/hi";
import Layout from "../components/Layout/Layout";
import styles from "../styles/pages/Login.module.scss";

export default function Login() {
  const [isEmailFormOpen, setIsEmailFormOpen] = useState(false);

  const handleEmailLogin = (event) => {
    event.preventDefault();
  };

  return (
    <Layout>
      <Head>
        <title>_CINEMA &bull; Login</title>
      </Head>

      <div className={styles.login_wrapper}>
        <div className={styles.login}>
          <h2>Log in to _CINEMA</h2>

          <div className={styles.login_continue}>
            <button className={styles.login_continue_facebook}>
              <FaFacebookF />
              Continue with Facebook
            </button>
            <button className={styles.login_continue_apple}>
              <FaApple />
              Continue with Apple
            </button>
          </div>

          <hr className={styles.line} />

          <form className={styles.login_email} onSubmit={handleEmailLogin}>
            {isEmailFormOpen && (
              <div className={styles.login_email_group}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type={"text"}
                  placeholder={"my@email.address"}
                  required
                />
              </div>
            )}

            <button
              type={isEmailFormOpen ? "button" : "submit"}
              onClick={() => setIsEmailFormOpen((prev) => !prev)}
            >
              {isEmailFormOpen ? (
                <HiOutlineLockOpen />
              ) : (
                <HiOutlineLockClosed />
              )}
              Continue with Email
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
