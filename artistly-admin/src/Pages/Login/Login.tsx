import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

const Login = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onLogin = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Bine ai revenit !"),
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
      })
      .catch((exception: any) => {
        toast.error(exception.message);
      });
  };
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col justify-center">
        <svg
          width="356"
          height="84"
          viewBox="0 0 356 84"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_3654_6860)">
            <path
              d="M0 42.9957C0 42.9957 59.013 49.2541 78.1901 81.5981C79.5893 83.9597 82.6346 84.7112 84.9445 83.2539C86.1552 82.4918 87.3711 81.4451 89.3066 79.4457C89.3066 79.4457 77.5476 55.8801 35.0807 35.7577C23.7809 30.8734 13.7689 28.9599 4.4737 28.9599C1.19476 28.9599 0.307981 30.9109 0 42.993L0 42.9957Z"
              fill="url(#paint0_linear_3654_6860)"
            />
            <path
              d="M29.7733 28.3372C29.7733 28.3372 71.6906 42.7407 89.3066 79.4511C89.3066 79.4511 92.8139 75.7744 87.5703 63.6387C81.5593 51.6801 58.5775 6.68511 58.5775 6.68511C58.5775 6.68511 56.257 0.475013 49.5319 0.0241507C42.8067 -0.426712 39.6393 6.20204 39.6393 6.20204L28.9423 22.8652C28.9423 22.8652 26.351 26.04 29.7706 28.3372H29.7733Z"
              fill="url(#paint1_linear_3654_6860)"
            />
            <path
              d="M14.3981 49.9008C14.3981 49.9008 10.3359 57.8017 6.78353 68.1098C3.23113 78.4179 6.19147 78.544 12.7175 82.371C18.6249 85.6022 21.5029 83.1681 23.6376 81.1311C25.7722 79.0915 32.1893 60.0855 40.3296 58.2364C40.3296 58.2364 26.4014 51.4466 14.3955 49.9008H14.3981Z"
              fill="url(#paint2_linear_3654_6860)"
            />
            <path
              d="M157.352 25.2403H165.158V28.6808C167.619 25.828 171.023 24.0702 175.22 24.0702C176.306 24.0702 177.392 24.2178 178.478 24.4351V34.2414C176.742 33.9489 175.149 33.9489 173.481 33.9489C169.573 33.9489 166.459 36.5091 166.459 39.7296V61.8299H155.382V27.2289C155.382 26.1312 156.263 25.2403 157.349 25.2403H157.352Z"
              fill="#333333"
            />
            <path
              d="M189.05 48.9535V34.1716H181.81V25.2429H189.05V18.3029C189.05 16.8 190.256 15.5843 191.74 15.5843H200.127V25.2429H209.032V34.1716H200.127V48.9535C200.127 51.0763 201.574 52.3188 203.385 52.3188H209.032V61.8326H203.385C195.494 61.8326 189.05 57.1495 189.05 48.9535Z"
              fill="#333333"
            />
            <path
              d="M220.905 7.53047C224.38 7.53047 227.277 10.4584 227.277 13.9714C227.277 17.4843 224.38 20.4123 220.905 20.4123C217.43 20.4123 214.607 17.4843 214.607 13.9714C214.607 10.4584 217.43 7.53047 220.905 7.53047ZM215.404 25.2403H226.481V61.8299H215.404V25.2403Z"
              fill="#333333"
            />
            <path
              d="M232.417 49.5385H243.058C243.058 52.0263 245.159 54.5141 249.502 54.5141C252.542 54.5141 254.642 53.1964 254.642 51.4413C254.642 49.4661 252.181 48.661 247.402 47.6358C241.176 46.2456 232.996 43.7578 232.996 35.9268C232.996 27.5831 242.047 24.0702 248.995 24.0702C257.972 24.0702 265.14 29.9233 265.14 37.0969H254.571C254.571 34.9741 252.616 32.5587 248.78 32.5587C245.958 32.5587 244.075 33.8764 244.075 35.5591C244.075 37.7544 247.261 38.6319 251.459 39.5095C258.046 41.0473 265.722 43.5351 265.722 51.1461C265.722 59.7071 256.092 63.0027 249.215 63.0027C239.803 63.0027 232.42 57.0019 232.42 49.5385H232.417Z"
              fill="#333333"
            />
            <path
              d="M275.999 48.9535V34.1716H268.759V25.2429H275.999V19.5079C275.999 17.3394 277.738 15.5816 279.884 15.5816H287.076V25.2402H295.981V34.1689H287.076V48.9508C287.076 51.0736 288.523 52.3162 290.334 52.3162H295.981V61.8299H290.334C282.443 61.8299 275.999 57.1468 275.999 48.9508V48.9535Z"
              fill="#333333"
            />
            <path
              d="M303.986 8.26312H311.797C312.699 8.26312 313.43 9.00114 313.43 9.9136V60.1821C313.43 61.0946 312.699 61.8326 311.797 61.8326H303.986C303.083 61.8326 302.353 61.0946 302.353 60.1821V9.9136C302.353 9.00114 303.083 8.26312 303.986 8.26312Z"
              fill="#333333"
            />
            <path
              d="M321.177 66.9559H326.825C328.85 66.9559 329.939 65.7106 330.661 63.5905L331.747 60.8102L317.991 25.243H329.14L337.32 48.2961L345.5 25.243H355.998L341.881 61.8327L341.156 63.5878C338.26 71.2713 334.784 76.4669 326.822 76.4669H321.175V66.9532L321.177 66.9559Z"
              fill="#333333"
            />
            <path
              d="M104.488 42.5931C104.488 30.9163 114.075 21.4643 124.448 21.4643C129.557 21.4643 133.959 23.7669 137.023 27.5804V22.7337H144.242C146.113 22.7337 147.629 24.2661 147.629 26.1581V62.4498H139.935C138.326 62.4498 137.02 61.1321 137.02 59.5031V57.6031C133.956 61.4166 129.554 63.7192 124.446 63.7192C114.073 63.7192 104.485 54.2672 104.485 42.5904L104.488 42.5931ZM126.1 53.0005C131.365 53.0005 135.687 48.3148 135.687 42.5958C135.687 36.8768 131.365 32.1911 126.1 32.1911C120.835 32.1911 116.513 36.8768 116.513 42.5958C116.513 48.3148 120.835 53.0005 126.1 53.0005Z"
              fill="#333333"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_3654_6860"
              x1="-5.65783"
              y1="25.2617"
              x2="100.531"
              y2="86.4849"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FFBA08" />
              <stop offset="1" stop-color="#F7931E" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_3654_6860"
              x1="28.005"
              y1="39.7242"
              x2="90.4563"
              y2="39.7242"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FFBA08" />
              <stop offset="1" stop-color="#F7931E" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_3654_6860"
              x1="31.7778"
              y1="46.4362"
              x2="13.3006"
              y2="77.7242"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FFBA08" />
              <stop offset="1" stop-color="#F7931E" />
            </linearGradient>
            <clipPath id="clip0_3654_6860">
              <rect width="356" height="84" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <fieldset className="w-full my-2 border-2 border-[#00000059] rounded-[0.625rem] pb-2 focus-within:border-[#354F52]">
          <legend className="ms-5 px-2 inline-flex text-[14px]">Email</legend>
          <input
            inputMode="text"
            type="email"
            className="w-full rounded-[0.625rem] h-4 px-4 py-3 focus-visible:outline-0"
            onChange={(e) => setEmail(e.target.value)}
            required
            value={email}
          />
        </fieldset>
        <fieldset className="w-full my-2 border-2 border-[#00000059] rounded-[0.625rem] pb-2 focus-within:border-[#354F52]">
          <legend className="ms-5 px-2 inline-flex text-[14px]">Parola</legend>
          <input
            inputMode="text"
            type="password"
            className="w-full rounded-[0.625rem] h-4 px-4 py-3 focus-visible:outline-0"
            onChange={(e) => setPassword(e.target.value)}
            required
            value={password}
          />
        </fieldset>

        <button
          onClick={(e) => onLogin(e)}
          className="border border-black mt-12 py-2 rounded-lg"
        >
          Continua
        </button>
      </div>
    </div>
  );
};

export default Login;
