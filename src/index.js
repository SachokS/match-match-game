module.exports = function solveSudoku(matrix)
{
  var tr = [];
  var countt=0;
  function Sudoku (in_val) {

  var solved = [];
  var st = 0;

  insolved(in_val);
  solve();
  function insolved(in_val) {
  st = 0;
  var sugg = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for ( var i=0; i<9; i++) {
  solved[i] = [];
  for ( var j=0; j<9; j++ ) {
  if ( in_val[i][j] ) {
  solved[i][j] = [in_val[i][j], 'in', []];
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

  if ( !isSolved() && !isFailed() ) {

  backtracking();
  }
  };
  function updatesuggs() {
  var changed = 0;
  var b = strayDiff(solved[1][3][2], rowContent(1));
  b = strayDiff(b, colContent(3));
  b = strayDiff(b, sectContent(1, 3));
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
  solved[i][j][2] = strayDiff(solved[i][j][2], rowContent(i));
  solved[i][j][2] = strayDiff(solved[i][j][2], colContent(j));
  solved[i][j][2] = strayDiff(solved[i][j][2], sectContent(i, j));
  if ( 1 == solved[i][j][2].length ) {
  // Исключили все варианты кроме одного
  markSolved(i, j, solved[i][j][2][0]);
  return 1;
  }
  return 0;
  };
  function solveHiddenSingle(i, j) {
  var less_sugg = lessRowsugg(i, j);
  var changed = 0;
  if ( 1 == less_sugg.length ) {
  markSolved(i, j, less_sugg[0]);
  changed++;
  }
  var less_sugg = lessColsugg(i, j);
  if ( 1 == less_sugg.length ) {
  markSolved(i, j, less_sugg[0]);
  changed++;
  }
  var less_sugg = lessSectsugg(i, j);
  if ( 1 == less_sugg.length ) {
  markSolved(i, j, less_sugg[0]);
  changed++;
  }
  return changed;
  };
  function markSolved(i, j, solve) {
  solved[i][j][0] = solve;
  solved[i][j][1] = 'solved';
  };
  function rowContent(i) {
  var content = [];
  for ( var j=0; j<9; j++ ) {
  if ( 'unknown' != solved[i][j][1] ) {
  content[content.length] = solved[i][j][0];
  }
  }
  return content;
  };
  function colContent(j) {
  var content = [];
  for ( var i=0; i<9; i++ ) {
  if ( 'unknown' != solved[i][j][1] ) {
  content[content.length] = solved[i][j][0];
  }
  }
  return content;
  };
  function sectContent(i, j) {
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
  function lessRowsugg(i, j) {
  var less_sugg = solved[i][j][2];
  for ( var k=0; k<9; k++ ) {
  if ( k == j || 'unknown' != solved[i][k][1] ) {
  continue;
  }
  less_sugg = strayDiff(less_sugg, solved[i][k][2]);
  }
  return less_sugg;
  };
  function lessColsugg(i, j) {
  var less_sugg = solved[i][j][2];
  for ( var k=0; k<9; k++ ) {
  if ( k == i || 'unknown' != solved[k][j][1] ) {
  continue;
  }
  less_sugg = strayDiff(less_sugg, solved[k][j][2]);
  }
  return less_sugg;
  };
  function lessSectsugg(i, j) {
  var less_sugg = solved[i][j][2];
  var offset = sectOffset(i, j);
  for ( var k=0; k<3; k++ ) {
  for ( var l=0; l<3; l++ ) {
  if ( ((offset.i+k) == i && (offset.j+l) == j)|| 'unknown' != solved[offset.i+k][offset.j+l][1] ) {
  continue;
  }
  less_sugg = strayDiff(less_sugg, solved[offset.i+k][offset.j+l][2]);
  }
  }
  return less_sugg;
  }; // end of method lessSectsugg()

  function strayDiff (ar1, ar2) {
  var str_diff = [];
  for ( var i=0; i<ar1.length; i++ ) {
  var is_found = false;
  for ( var j=0; j<ar2.length; j++ ) {
  if ( ar1[i] == ar2[j] ) {
  is_found = true;
  break;
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

  function isSolved() {
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

  this.isSolved = function() {
  return isSolved();
  };
  function isFailed() {
  var is_failed = false;
  for ( var i=0; i<9; i++) {
  for ( var j=0; j<9; j++ ) {
  if ( 'unknown' == solved[i][j][1] && !solved[i][j][2].length ) {
  is_failed = true;
  }
  }
  }
  return is_failed;
  };

  this.isFailed = function() {
  return isFailed();
  };


  function backtracking() {
  backtracking_call++;
  var in_val = [[], [], [], [], [], [], [], [], []];
  var i_min=-1, j_min=-1, suggs_cnt=0;
  for ( var i=0; i<9; i++ ) {
  in_val[i].length = 9;
  for ( var j=0; j<9; j++ ) {
  in_val[i][j] = solved[i][j][0];
  if ( 'unknown' == solved[i][j][1] && (solved[i][j][2].length < suggs_cnt || !suggs_cnt) ) {
  suggs_cnt = solved[i][j][2].length;
  i_min = i;
  j_min = j;
  }
  }
  }


  for ( var k=0; k<suggs_cnt; k++ ) {
  in_val[i_min][j_min] = solved[i_min][j_min][2][k];
  Sudoku(in_val);
  if ( isSolved() ) {

  out_val = isSolved();

  for ( var i=0; i<9; i++ ) {
  for ( var j=0; j<9; j++ ) {
  if ( 'unknown' == solved[i][j][1] ) {
  markSolved(i, j, out_val[i][j][0])
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
