import './pagination.css';

function Pagination(props) {
    const {
        className,
        maxCount,
        pageIndex,
        updateIndex
    } = props;

    const onPrev = () => {
        updateIndex(
            pageIndex === 0
                ? maxCount - 1
                : pageIndex - 1
        );
    };

    const onNext = () => {
        updateIndex(
            pageIndex === (maxCount - 1)
                ? 0
                : pageIndex + 1
        );
    };
    
    return (
        <div className={className}>
            {   // if is first page then do not render
                pageIndex === 0
                    ? null
                    : (
                        <button
                            className="pagination__prev-btn"
                            onClick={onPrev}
                        >
                            {'<'}
                        </button>
                    )
            }
            
            <div
                className="pagination__page-num-text"
            >
                {`${pageIndex + 1} / ${maxCount}`}
            </div>

            {   // if is last page then do not render
                pageIndex === (maxCount - 1)
                    ? null
                    : (
                        <button
                            className="pagination__next-btn"
                            onClick={onNext}
                        >
                            {'>'}
                        </button>
                    )
            }
        </div>
    );
}

Pagination.defaultProps = {
    className: 'pagination',
    maxCount: 0,
    pageIndex: 0,
    updateIndex: () => {}
};

export default Pagination;