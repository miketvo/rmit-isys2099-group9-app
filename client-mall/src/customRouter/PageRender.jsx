import { createElement, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";

const generatePage = pageName => {
  const pageComponent = lazy(() =>
    import(`../pages/${pageName}.jsx`)
      .then(module => {
        return { default: module.default };
      })
      .catch(() => {
        return { default: NotFound };
      }),
  );

  return createElement(
    Suspense,
    { fallback: <div>Loading...</div> },
    createElement(pageComponent),
  );
};

const NotFound = () => (
  <div>
    <h2>Not Found</h2>
  </div>
);

const PageRender = () => {
  const { page, id, subPage, subId } = useParams();
  let pageName = "";

  if (id) {
    if (subPage) {
      if (subId) {
        pageName = `${page}/[id]/${subPage}/[id]`;
      } else {
        pageName = `${page}/[id]/${subPage}`;
      }
    } else {
      pageName = `${page}/[id]`;
    }
  } else {
    pageName = `${page}`;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {generatePage(pageName)}
    </Suspense>
  );
};

export default PageRender;
