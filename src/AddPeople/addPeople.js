import AddItems from '../AddItems/addItems';

function AddPeople(props) {
  // renderer
  return (
    <AddItems
      {...props}
    />
  );
}

AddPeople.defaultProps = {
  id: 'add-people',
  title: 'Adding People...',
  fieldName: 'Name'
};

export default AddPeople;
