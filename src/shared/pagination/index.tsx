import "./style.scss";

interface paginationType {
  currentPage: number;
  setCurrentPage: (value: number) => void;
  pages: number[];
}

export const Pagination = ({
  currentPage,
  setCurrentPage,
  pages,
}: paginationType) => {
  const handleClickPrevButton = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };

  const handleClickNextButton = () => {
    if (currentPage === pages.length) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  const handleClickPageNumber = (selectedId: number) => {
    setCurrentPage(selectedId);
  };

  return (
    <div className="pagination-area">
      <div className="pagination-container">
        <div className="prev-button-container" onClick={handleClickPrevButton}>
          <img
            src={require("../../assets/images/left-arrow.png")}
            className={`prev-icon ${currentPage === 1 ? "disable" : ""}`}
            alt=""
          />
          <span className={`${currentPage === 1 ? "disable" : ""} prev-text`}>
            Prev
          </span>
        </div>

        {pages.map((item, index) => (
          <div
            key={index}
            className={`page-number ${currentPage !== item ? "disable" : ""}`}
            onClick={() => handleClickPageNumber(item)}
          >
            {item}
          </div>
        ))}

        <div className="next-button-container" onClick={handleClickNextButton}>
          <div
            className={`${
              currentPage === pages.length ? "disable" : ""
            } next-text`}
          >
            Next
          </div>

          <img
            src={require("../../assets/images/right-arrow.png")}
            className={`prev-icon ${currentPage === 1 ? "disable" : ""}`}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
