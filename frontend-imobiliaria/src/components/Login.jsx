import "../styles/css/auth.css";

export default function Login() {
  return (
    <div
      className="auth-page"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg-login.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="auth-card">{/* ... */}</div>
    </div>
  );
}
