cd "/Users/josh/repositories/_websites/toc_test/files/poissonapprox_files"
cap prog drop binsim
program def binsim, rclass
    drop _all
    args n p b1
    set obs `n'
    gen x = rnormal()
    gen y = rbinomial(1, invlogit(logit(`p') + `b1'*x))
    * Return P(success) to ensure everything is working
    mean y
    mat b = e(b)
    scalar pp = b[1,1]
    return scalar pp=pp

    * Poisson model
    poisson y x
    mat b = e(b)
    scalar b_pois = b[1,1]
    return scalar b_pois=b_pois

    * Logistic model
    logistic y x
    mat b = e(b)
    scalar b_logit = b[1,1]
    return scalar b_logit=b_logit
end

local beta1 .4
local reps 10

foreach level of numlist 10 5 3 1 {

	local prev = `level'/100
simulate pp=r(pp) b_pois=r(b_pois) b_logit=r(b_logit), ///
    reps(`reps') nodots: binsim 10000 `prev' `beta1'
	
twoway kdensity b_logit || kdensity b_pois, ///
    xline(`beta1') legend(label(1 "Logistic") label(2 "Poisson")) 

graph export "../images/poisson`level'.svg", replace
	
twoway kdensity b_logit || kdensity b_pois, ///
    xline(`beta1') legend(label(1 "Logistic") label(2 "Poisson")) ///
	scheme(black_hue) 
	
graph export "../images/poisson`level'_dark.svg", replace
}
