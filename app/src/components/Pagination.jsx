// import { useNavigate } from "react-router-dom";

// interface Props {
//   pageNumber: number;
//   isNext: boolean;
//   path: string;
// }

function Pagination({ pageNumber, isNext, path }) {
  // const navigate = useNavigate();

  const handleNavigation = (type) => {
    let nextPageNumber = pageNumber;

    if (type === "prev") {
      nextPageNumber = Math.max(1, pageNumber - 1);
    } else if (type === "next") {
      nextPageNumber = pageNumber + 1;
    }

    if (nextPageNumber > 1) {
      // navigate(`${path}?page=${nextPageNumber}`);
    } else {
      // navigate(path);
    }
  };

  if (!isNext && pageNumber === 1) return null;

  return (
    <div className="pagination">
      <button
        onClick={() => handleNavigation("prev")}
        disabled={pageNumber === 1}
        className="!text-small-regular text-light-2"
      >
        Prev
      </button>
      <p className="text-small-semibold text-light-1">{pageNumber}</p>
      <button
        onClick={() => handleNavigation("next")}
        disabled={!isNext}
        className="!text-small-regular text-light-2"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
