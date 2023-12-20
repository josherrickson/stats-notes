clear
set obs 100
gen x = runiform(0, 10)
gen z = x > 5
gen y = x - 2*x*z + 10*z + rnormal()
twoway (scatter y x if z == 1) (scatter y x if z == 0) (lfit y x), ///
	legend(off)
graph export "../images/splinesinteractions1.svg", replace

clear
set seed 123
set obs 100
gen x = runiform(0, 10)
sort x // To ease plotting later
gen z = x > 5
gen y = x + z - x*z + rnormal()
twoway (scatter y x if z == 1) (scatter y x if z == 0), ///
	legend(off) 
graph export "../images/splinesinteractions2.svg", replace

reg y x if z == 0
reg y x if z == 1

mkspline x0 5 x1 = x, marginal

reg y x0 x1
est store spline1
predict y_spline1
twoway (scatter y x if z == 1) (scatter y x if z == 0) ///
       (line y_spline1 x if z == 1, lcolor(navy)) ///
       (line y_spline1 x if z == 0, lcolor(maroon)), ///
         legend(off) 
graph export "../images/splinesinteractions3.svg", replace

reg y x0 x1 z
est store spline2
predict y_spline2
twoway (scatter y x if z == 1) (scatter y x if z == 0) ///
       (line y_spline2 x if z == 1, lcolor(navy)) ///
       (line y_spline2 x if z == 0, lcolor(maroon)), ///
         legend(off)
graph export "../images/splinesinteractions4.svg", replace

mkspline x0a 5 x1a = x
reg y x0a x1a z
est store spline3
predict y_spline3
twoway (scatter y x if z == 1) (scatter y x if z == 0) ///
       (line y_spline3 x if z == 1, lcolor(navy)) ///
       (line y_spline3 x if z == 0, lcolor(maroon)), ///
         legend(off)
graph export "../images/splinesinteractions5.svg", replace

reg y c.x##c.z
predict y_naive
twoway (scatter y x if z == 1) (scatter y x if z == 0) ///
       (line y_naive x if z == 1, lcolor(navy)) ///
       (line y_naive x if z == 0, lcolor(maroon)), ///
         legend(off)
graph export "../images/splinesinteractions6.svg", replace

gen xc = x - 5
reg y c.xc c.xc#i.z
est store int1
predict y_int1
twoway (scatter y x if z == 1) (scatter y x if z == 0) ///
       (line y_int1 x if z == 1, lcolor(navy)) ///
       (line y_int1 x if z == 0, lcolor(maroon)), ///
         legend(off)
graph export "../images/splinesinteractions7.svg", replace

est table spline1 int1

reg y c.xc##i.z
est store int2
predict y_int2
twoway (scatter y x if z == 1) (scatter y x if z == 0) ///
       (line y_int2 x if z == 1, lcolor(navy)) ///
       (line y_int2 x if z == 0, lcolor(maroon)), ///
         legend(off)
graph export "../images/splinesinteractions8.svg", replace

est table spline2 int2

margins z, dydx(xc)
