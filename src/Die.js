const Die = ({ value, isHeld, hold }) => {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "#fff",
    color: isHeld ? "#4361ee" : "#000",
    boxShadow: isHeld ? `0px 12px 12px rgba(0,0,0,0.25)` : "",
  };
  return (
    <button
      style={styles}
      onClick={hold}
      className={isHeld ? "held-outline" : ""}
    >
      {value}
    </button>
  );
};

export default Die;
