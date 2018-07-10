import svg4everybody from 'svg4everybody';
import objectFitImages from 'object-fit-images';
import './globalOptions';
import anchor from '../blocks/js-functions/anchor';
import carousel from '../blocks/carousel/carousel';
import products from '../blocks/products/products';
import header from '../components/header/header';
import screen from '../components/screen/screen';

const $ = window.$;

$(() => {
  svg4everybody();
  objectFitImages();
  anchor();
  carousel();
  products();
  header();
  screen();
});
