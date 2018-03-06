module.exports = function solveSudoku(matrix)
{
  var tr = [];
  var countt=0;
  function Sudoku (mat) {

  var solved = [];
  var st = 0;

  insolved(mat);
  solve();
  function insolved(mat) {
  st = 0;
  var sugg = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for ( var i=0; i<9; i++) {
  solved[i] = [];
  for ( var j=0; j<9; j++ ) {
  if ( mat[i][j] ) {
  solved[i][j] = [mat[i][j], 'in', []];
  }
  else {
  solved[i][j] = [0, 'unknown', sugg];
  }
  }
  }
  };

  function solve() {
  var changed = 0;
  do {

  changed = updatesuggs();
  st++;
  if ( 81 < st ) {

  break;
  }
  } while (changed);

  if ( !iss() && !isf() ) {

  backtracking();
  }
  };
  function updatesuggs() {
  var changed = 0;
  var b = strayDiff(solved[1][3][2], row(1));
  b = strayDiff(b, col(3));
  b = strayDiff(b, sect(1, 3));
  for ( var i=0; i<9; i++) {
  for ( var j=0; j<9; j++) {
  if ( 'unknown' != solved[i][j][1] ) {

  continue;
  }


  changed += solveSingle(i, j);


  changed += solveHiddenSingle(i, j);
  }
  }
  return changed;
  };
  function solveSingle(i, j) {
  solved[i][j][2] = strayDiff(solved[i][j][2], row(i));
  solved[i][j][2] = strayDiff(solved[i][j][2], col(j));
  solved[i][j][2] = strayDiff(solved[i][j][2], sect(i, j));
  if ( 1 == solved[i][j][2].length ) {
  // Исключили все варианты кроме одного
  mark(i, j, solved[i][j][2][0]);
  return 1;
  }
  return 0;
  };
  function solveHiddenSingle(i, j) {
  var less = lessRow(i, j);
  var changed = 0;
  if ( 1 == less.length ) {
  mark(i, j, less[0]);
  changed++;
  }
  var less = lessCol(i, j);
  if ( 1 == less.length ) {
  mark(i, j, less[0]);
  changed++;
  }
  var less = lessSect(i, j);
  if ( 1 == less.length ) {
  mark(i, j, less[0]);
  changed++;
  }
  return changed;
  };
  function mark(i, j, solve) {
  solved[i][j][0] = solve;
  solved[i][j][1] = 'solved';
  };
  function row(i) {
  var content = [];
  for ( var j=0; j<9; j++ ) {
  if ( 'unknown' != solved[i][j][1] ) {
  content[content.length] = solved[i][j][0];
  }
  }
  return content;
  };
  function col(j) {
  var content = [];
  for ( var i=0; i<9; i++ ) {
  if ( 'unknown' != solved[i][j][1] ) {
  content[content.length] = solved[i][j][0];
  }
  }
  return content;
  };
  function sect(i, j) {
  var content = [];
  var offset = sectOffset(i, j);
  for ( var k=0; k<3; k++ ) {
  for ( var l=0; l<3; l++ ) {
  if ( 'unknown' != solved[offset.i+k][offset.j+l][1] ) {
  content[content.length] = solved[offset.i+k][offset.j+l][0];
  }
  }
  }
  return content;
  };
  function lessRow(i, j) {
  var less = solved[i][j][2];
  for ( var k=0; k<9; k++ ) {
  if ( k == j || 'unknown' != solved[i][k][1] ) {
  continue;
  }
  less = strayDiff(less, solved[i][k][2]);
  }
  return less;
  };
  function lessCol(i, j) {
  var less = solved[i][j][2];
  for ( var k=0; k<9; k++ ) {
  if ( k == i || 'unknown' != solved[k][j][1] ) {
  continue;
  }
  less = strayDiff(less, solved[k][j][2]);
  }
  return less;
  };
  function lessSect(i, j) {
  var less = solved[i][j][2];
  var offset = sectOffset(i, j);
  for ( var k=0; k<3; k++ ) {
  for ( var l=0; l<3; l++ ) {
  if (  'unknown' != solved[offset.i+k][offset.j+l][1] ) {
  continue;
  }
  less = strayDiff(less, solved[offset.i+k][offset.j+l][2]);
  }
  }
  return less;
  }; // end of method lessSect()

  function strayDiff (ar1, ar2) {
  var str_diff = [];
  for ( var i=0; i<ar1.length; i++ ) {
  var is_found = false;
  for ( var j=0; j<ar2.length; j++ ) {
  if ( ar1[i] == ar2[j] ) {
  is_found = true;

  }
  }
  if ( !is_found ) {
  str_diff[str_diff.length] = ar1[i];
  }
  }
  return str_diff;
  };

  function strayUnique(ar){
  var sorter = {};
  for(var i=0,j=ar.length;i<j;i++){
  sorter[ar[i]] = ar[i];
  }
  ar = [];
  for(var i in sorter){
  ar.push(i);
  }
  return ar;
  };


  function sectOffset(i, j) {
  return {
  j: Math.floor(j/3)*3,
  i: Math.floor(i/3)*3
  };
  };

  function iss() {
  var is_solved = true;
  for ( var i=0; i<9; i++) {
  for ( var j=0; j<9; j++ ) {
  if ( 'unknown' == solved[i][j][1] ) {
  is_solved = false;
  }
  }
  }
  return is_solved;
  };

  this.iss = function() {
  return iss();
  };
  function isf() {
  var is_failed = false;
  for ( var i=0; i<9; i++) {
  for ( var j=0; j<9; j++ ) {
  if ( 'unknown' == solved[i][j][1] && !solved[i][j][2].length ) {
  is_failed = true;
  }
  }
  }
  };



  function backtracking() {
  backtracking_call++;
  var mat = [[], [], [], [], [], [], [], [], []];
  var i_min=-1, j_min=-1, suggs_cnt=0;
  for ( var i=0; i<9; i++ ) {
  mat[i].length = 9;
  for ( var j=0; j<9; j++ ) {
  mat[i][j] = solved[i][j][0];
  if ( 'unknown' == solved[i][j][1] && (!suggs_cnt) ) {
  suggs_cnt = solved[i][j][2].length;
  i_min = i;
  j_min = j;
  }
  }
  }


  for ( var k=0; k<suggs_cnt; k++ ) {
  mat[i_min][j_min] = solved[i_min][j_min][2][k];
  Sudoku(mat);
  if ( iss() ) {

  out_val = iss();

  for ( var i=0; i<9; i++ ) {
  for ( var j=0; j<9; j++ ) {
  if ( 'unknown' == solved[i][j][1] ) {
  mark(i, j, out_val[i][j][0])
  }
  }
  }
  return;
  }
  }
  };


  ss=[];
  for ( var i=0; i<9; i++) {
  ss[i] = [];}
  for ( var i=0; i<9; i++) {
  for ( var j=0; j<9; j++ ) {
  ss[i][j]= solved[i][j][0];
  tr[countt]=ss;
  countt++;
  }

  }
  return(tr);
  };
  var backtracking_call = 0;

  var asda=Sudoku(matrix);
  return(asda[0]);



}
