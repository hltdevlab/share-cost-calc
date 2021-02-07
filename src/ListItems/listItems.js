import './listItems.css';

function ListItems(props) {
    const {
        className,
        items,
        updateItems
    } = props;

    const onDelClick = (e) => {
        const parentElem = e.currentTarget.parentElement;
        const spanElem = parentElem.querySelector(`.${className}__item-text`);
        const itemToDelete = spanElem.textContent.trim();

        const resultItems = items.filter((item) => (item !== itemToDelete));
        updateItems([...resultItems]);
    }

    return (
        <ul className={className}>
            {
                items.map(
                    item => (
                        <li
                            key={item}
                            className={`${className}__item`}
                        >
                            <div className={`${className}__item-text`}>
                                {item}
                            </div>
                            <div className={`${className}__item-dots`} />
                            <button
                                onClick={onDelClick}
                            >
                                X
                            </button>
                        </li>
                    )
                )
            }
        </ul>
    );
}

ListItems.defaultProps = {
    id: 'list-items',
    className: 'list-items',
    items: [],
    updateItems: () => {}
  };

export default ListItems;
