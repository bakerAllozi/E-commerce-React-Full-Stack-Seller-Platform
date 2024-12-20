function StarRating({ rating }) {
  const totalStars = 5;
  return (
    <div className="flex gap-1">
      {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          className={index < rating ? "text-yellow-500" : "text-gray-300"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default StarRating;
