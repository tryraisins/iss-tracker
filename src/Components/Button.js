const Button = ({ launch }) => {
  return (
    <div>
      <button className='btn btn-primary m-2' onClick={launch}>
        Get Location
      </button>
    </div>
  );
};
export default Button;
