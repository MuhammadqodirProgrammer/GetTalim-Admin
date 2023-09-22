import ReactPaginate from "react-paginate";

export const Pagination = ({ totalPage, setActivePage, activePage }: any) => {
  return (
    <ReactPaginate
      className="pagination justify-content-center gap-3 align-items-center py-5"
      pageCount={totalPage}
      forcePage={activePage}
      previousLabel="prev"
      nextLabel="next"
      previousLinkClassName="btn btn-primary"
      nextLinkClassName="btn btn-primary"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      activeClassName="active"
      onPageChange={(data) => {
        setActivePage(data.selected + 1);
      }}
    />
  );
};
