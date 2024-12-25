export default function Die(props) {
  const style = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <button onClick={() => props.hold(props.id)} style={style}>
      {props.value}
    </button>
  );
}
