import icons from 'url:../../img/icons.svg';
import View from './View.js';
import { paginationBtnNext, paginationBtnPrev } from '../helpers.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //Page 1 with more pages
    if (curPage === 1 && numPages > 1) {
      return paginationBtnNext(curPage);
    }
    //Last page
    if (curPage === numPages && numPages > 1) {
      return paginationBtnPrev(curPage);
    }
    //Middle page
    if (curPage < numPages) {
      return `
      ${paginationBtnPrev(curPage) + paginationBtnNext(curPage)}
      `;
    }
    //Page 1 with no more pages
    return '';
  }
}

export default new PaginationView();
