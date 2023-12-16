<body>
  <div>
    <h1>Inter-rater Reliability</h1>

    <p>
      A few notes on agreement between raters.
    </p>


    <section id="kappa">
      <h2>Cohen's $\kappa$</h2>

      <p>
        Cohen's $\kappa$ can be used for agreement between two raters on categorical
        data. The basic calculation is
      </p>

      $$
      \kappa = \frac{p_a - p_e}{1 - p_e},
      $$

      <p>
        where $p_a$ is the percentage observed agreement and $p_e$ is the percentage
        expected agreement by chance. Therefore $\kappa$ is what percentage of the
        agreement over chance is observed.
      </p>

      <p>
        Fleiss' $\kappa$ is an extension to more than two raters and has a similar form.
      </p>

      <p>
        A major flaw in either $\kappa$ is that for ordinal data, any disagreement is
        treated equal. E.g. on a Likert scale, ratings of 4 and 5 are just as
        disagreeable as ratings of 1 and 5. Weighted $\kappa$ addresses this by
        including a weight matrix which can be used to provide levels of
        disagreement.
      </p>

      <section id="kappa_sources">
        <h3>Sources</h3>

        <ul>
          <li><a href="https://en.wikipedia.org/wiki/Cohen's_kappa">https://en.wikipedia.org/wiki/Cohen's_kappa</a></li>
          <li><a href="http://john-uebersax.com/stat/kappa.htm">http://john-uebersax.com/stat/kappa.htm</a></li>
          <li><a href="https://www.stata.com/manuals/rkappa.pdf">https://www.stata.com/manuals/rkappa.pdf</a></li>
        </ul>
      </section>
    </section>
    <section id="icc">
      <h2>Intra-class correlation</h2>

      <p>
        ICC is used for continuous measurements. It can be used in place of weighted
        $\kappa$ with ordinal variables of course. The basic calculation is
      </p>

      $$
      ICC = \frac{\sigma^2_w}{\sigma^2_w + \sigma^2_b},
      $$

      <p>
        where $\sigma^2_w$ and $\sigma^2_b$ represent within- and between- rater
        variability respectively. Since the denominator is the total variance of all
        ratings regardless of rater, this fraction represents the percent of total
        variation accounted for by within-variation.
      </p>

      <p>
        The modern way to estimate the ICC is by a mixed model, extracting the
        $\sigma$'s that are needed.
      </p>

      <section id="icc_r">
        <h3>ICC in R</h3>

        <p>
          Use the `Orthodont` data from `nlme` as our example. Look at `distance`
          measurements and look at correlation by `Subject`.
        </p>

        ```{r}
        library(nlme)
        library(lme4)
        data(Orthodont)
        ```

      </section>
      <section id="icc_nlme">
        <h4>With `nlme`</h4>

        <p>
          Using the `nlme` package, we fit the model:
        </p>

        ```{r}
        fm1 <- lme(distance ~ 1, random = ~ 1 | Subject, data = Orthodont)
        summary(fm1)
        ```

        <p>
          The between-effect standard deviation is reported as the
          `Residual StdDev`. To obtain the ICC, we compute each $\sigma$:
        </p>


        ```{r}
        s2w <- getVarCov(fm1)[[1]]
        s2b <- fm1$s^2
        c(sigma2_w = s2w, sigma2_b = s2b, icc = s2w/(s2w + s2b))
        ```

      </section>
      <section id="icc_lme4">
        <h4>With `lme4`</h4>

        <p>
          Using the `lme4` package, we fit the model:
        </p>

        ```{r}
        fm2 <- lmer(distance ~ (1 | Subject), data = Orthodont)
        summary(fm2)
        ```

        <p>
          The Variance column of the Random Effects table gives the within-subject
          (Subject) and between-subject (Residual) variances.
        </p>

        ```{r}
        s2w <- summary(fm2)$varcor$Subject[1]
        s2b <- summary(fm2)$sigma^2
        c(sigma2_w = s2w, sigma2_b = s2b, icc = s2w/(s2w + s2b))
        ```

      </section>
      <section id="icc_sources">
        <h3>Sources</h3>

        <ul>
          <li><a href="https://en.wikipedia.org/wiki/Intraclass_correlation">https://en.wikipedia.org/wiki/Intraclass_correlation</a></li>
          <li><a href="http://stats.stackexchange.com/questions/14976/intraclass-correlation-coefficients-icc-with-multiple-variables">http://stats.stackexchange.com/questions/14976/intraclass-correlation-coefficients-icc-with-multiple-variables</a></li>
          <li><a href="<http://john-uebersax.com/stat/icc.htm">http://john-uebersax.com/stat/icc.htm</a></li>
        </ul>
      </section>
    </section>
	</div>
	<nav class="section-nav">
		<ol>
			<li class=""><a href="#kappa">Cohens Kappa</a>
        <ol>
          <li class=""><a href="#kappa_sources">Sources</a></li>
        </ol>
      </li>
			<li class=""><a href="#icc">ICC</a>
			  <ol>
				  <li class=""><a href="#icc_r">ICC in R</a>
            <ol>
              <li class=""><a href="#icc_nlme">ICC in nlme</a></li>
              <li class=""><a href="#icc_lme4">ICC in lme4</a></li>
            </ol>
          </li>
          <li class=""><a href="#icc_sources">Sources</a></li>
        </ol>
      </li>
    </ol>
	</nav>
</body>
