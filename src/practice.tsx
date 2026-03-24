const practice = () => {
  const logUser = () => {
    console.log('logging user from developer 2');
    console.log('logging user from  developer 1');
  };
  logUser();
  return (
    <div>
      <h1>Git branching</h1>
      <p>This para is from main branch</p>



      <div>
        <p>this para is of user-function branch</p>
      </div>
    </div>
  );
};

export default practice;
