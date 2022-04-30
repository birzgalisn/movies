import Head from "next/head";
import { useState } from "react";
import { FaApple, FaFacebookF } from "react-icons/fa";
import { HiOutlineLockClosed, HiOutlineLockOpen } from "react-icons/hi";
import styles from "../styles/pages/Login.module.scss";

const Login = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Head>
        <title>_CINEMA &bull; Login</title>
      </Head>

      <div className={styles.login_wrapper}>
        <div className={styles.login}>
          <h1>Log in to _CINEMA</h1>

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

          <form className={styles.login_email} onSubmit={handleSubmit}>
            {open && (
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
              type={open ? "button" : "submit"}
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? <HiOutlineLockOpen /> : <HiOutlineLockClosed />}
              Continue with Email
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
