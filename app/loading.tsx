import "./loading.css";
const loading = () => {
  return (
    <div className="w-full h-screen grid place-items-center">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default loading;
