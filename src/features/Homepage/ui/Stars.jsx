/*eslint react/prop-types:0*/
function Stars({ numStare = 5 }) {
  const starsArray = Array.from({ length: 5 }, (e, i) => (
    <img
      key={i}
      className="w-5 h-5"
      src={`${i < numStare ? "Vector.png" : "Vector (1).png"}`}
    />
  ));

  return <div className=" flex  gap-1 ">{starsArray}</div>;
}

export default Stars;
