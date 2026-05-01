/* =============================
   Core decision-tree dataset
   ============================= */
const rows = [
    {
        id: "A01",
        dv_count: "1",
        dv_kind: "continuous",
        iv_count: "1",
        iv_kind: "discrete",
        iv_levels: "2",
        design: "between",
        dv_parametric: "yes",
        dv_subtype: "",
        route: "",
        status: "resolved",
        recommended_test:
            "Independent-samples t-test (Welch default)",
        what_it_does:
            "Compares two independent group means on one continuous DV.",
        r_code:
            'fit <- rstatix::t_test(df, y ~ group, var.equal = FALSE, detailed = TRUE)\nfit',
        python_code:
            'import pingouin as pg\npg.ttest(x1, x2, paired=False, correction=True)',
        bayes_test: "Bayesian independent-samples t-test",
        bayes_r_code:
            "library(BayesFactor)\nttestBF(formula = y ~ group, data = df)",
        bayes_python_code:
            "import pingouin as pg\npg.ttest(x1, x2, paired=False)",
        effect_sizes: "Cohen's d, Hedges' g",
        follow_up_questions:
            "Check outliers, variance heterogeneity, CI for mean difference, and whether an equivalence test is needed.",
        equivalence_option:
            "TOST after defining equivalence bounds.",
    },
    {
        id: "A02",
        dv_count: "1",
        dv_kind: "continuous",
        iv_count: "1",
        iv_kind: "discrete",
        iv_levels: "2",
        design: "within",
        dv_parametric: "yes",
        dv_subtype: "",
        route: "",
        status: "resolved",
        recommended_test: "Paired-samples t-test",
        what_it_does:
            "Tests whether the mean paired difference differs from zero.",
        r_code: "fit <- t.test(df$y1, df$y2, paired = TRUE)",
        python_code:
            "from scipy import stats\nstats.ttest_rel(x1, x2)",
        bayes_test: "Bayesian paired t-test",
        bayes_r_code:
            "library(BayesFactor)\nttestBF(x = df$y1, y = df$y2, paired = TRUE)",
        bayes_python_code:
            "import pingouin as pg\npg.ttest(x1, x2, paired=True)",
        effect_sizes: "Cohen's dz, Hedges' gav",
        follow_up_questions:
            "Check normality of difference scores and whether agreement or equivalence is the real goal.",
        equivalence_option: "Paired TOST is available.",
    },
    {
        id: "A03",
        dv_count: "1",
        dv_kind: "continuous",
        iv_count: "1",
        iv_kind: "discrete",
        iv_levels: "2",
        design: "between",
        dv_parametric: "no",
        dv_subtype: "",
        route: "",
        status: "resolved",
        recommended_test: "Mann-Whitney U test",
        what_it_does:
            "Nonparametric comparison of two independent groups.",
        r_code:
            'fit <- rstatix::wilcox_test(df, y ~ group, exact = FALSE, detailed = TRUE)\nfit',
        python_code:
            'import pingouin as pg\npg.mwu(x1, x2)',
        bayes_test: "",
        bayes_r_code: "",
        bayes_python_code: "# not available: no standard maintained Python package provides a simple default Bayesian contingency-table test analogous to BayesFactor::contingencyTableBF",
        effect_sizes: "rank-biserial r, Cliff's delta",
        follow_up_questions:
            "If shapes differ strongly, consider Brunner-Munzel or permutation testing.",
        equivalence_option: "No simple standard TOST analogue.",
    },
    {
        id: "A04",
        dv_count: "1",
        dv_kind: "continuous",
        iv_count: "1",
        iv_kind: "discrete",
        iv_levels: "2",
        design: "within",
        dv_parametric: "no",
        dv_subtype: "",
        route: "",
        status: "resolved",
        recommended_test: "Wilcoxon signed-rank test",
        what_it_does:
            "Nonparametric paired comparison based on signed ranks.",
        r_code: "fit <- wilcox.test(df$y1, df$y2, paired = TRUE, exact = FALSE)",
        python_code:
            "import pingouin as pg\npg.wilcoxon(x1, x2)",
        bayes_test: "",
        bayes_r_code: "",
        bayes_python_code: "# not available: no standard maintained Python package provides a simple default Bayesian contingency-table test analogous to BayesFactor::contingencyTableBF",
        effect_sizes: "matched rank-biserial r",
        follow_up_questions:
            "Check symmetry of pairwise differences; otherwise consider a sign test.",
        equivalence_option: "No simple standard TOST analogue.",
    },
    {
        id: "A05",
        dv_count: "1",
        dv_kind: "continuous",
        iv_count: "1",
        iv_kind: "discrete",
        iv_levels: "gt2",
        design: "between",
        dv_parametric: "yes",
        dv_subtype: "",
        route: "",
        status: "resolved",
        recommended_test: "One-way ANOVA",
        what_it_does:
            "Tests whether at least one independent group mean differs.",
        r_code:
            'fit <- stats::aov(y ~ group, data = df)\nsummary(fit)\n\n# readable omnibus table\nrstatix::anova_test(data = df, dv = y, between = group)',
        python_code:
            'import pingouin as pg\npg.anova(data=df, dv="y", between="group", detailed=True)',
        bayes_test: "Bayesian one-way ANOVA",
        bayes_r_code:
            "library(BayesFactor)\nanovaBF(y ~ group, data = df)",
        bayes_python_code:
            'import bambi as bmb\nmodel = bmb.Model("y ~ group", df)\nidata = model.fit()',
        effect_sizes: "eta^2, partial eta^2, omega^2, Cohen's f",
        follow_up_questions:
            "If variances are unequal, use Welch ANOVA. If omnibus is significant, add post hoc tests.",
        equivalence_option:
            "Omnibus equivalence is possible after defining an effect bound.",
    },
    {
        id: "A06",
        dv_count: "1",
        dv_kind: "continuous",
        iv_count: "1",
        iv_kind: "discrete",
        iv_levels: "gt2",
        design: "within",
        dv_parametric: "yes",
        dv_subtype: "",
        route: "",
        status: "resolved",
        recommended_test:
            "One-way repeated-measures ANOVA or linear mixed model",
        what_it_does:
            "Tests repeated condition means from the same subjects; a linear mixed model is often preferable when data are incomplete, unbalanced, or more flexible covariance structures are needed.",
        r_code: 'library(afex)\nfit_aov <- aov_ez(id = "subject", dv = "y", within = "condition", data = df)\nfit_aov\n\n# or mixed model\nlibrary(lme4)\nfit_lmm <- lmer(y ~ condition + (1|subject), data = df)\nsummary(fit_lmm)',
        python_code:
            'import pingouin as pg\npg.rm_anova(data=df, dv="y", within="condition", subject="subject", detailed=True)\n\n# or mixed model\nimport statsmodels.formula.api as smf\nfit_lmm = smf.mixedlm("y ~ condition", data=df, groups=df["subject"]).fit()\nprint(fit_lmm.summary())',
        bayes_test:
            "Bayesian repeated-measures ANOVA / multilevel Gaussian model",
        bayes_r_code:
            'library(BayesFactor)\nanovaBF(y ~ condition + subject, data = df, whichRandom = "subject")',
        bayes_python_code:
            'import bambi as bmb\nmodel = bmb.Model("y ~ condition + (1|subject)", df)\nidata = model.fit()',
        effect_sizes:
            "partial eta^2, generalized eta^2, marginal / conditional R^2",
        follow_up_questions:
            "If any within effect has >2 levels, check sphericity and apply GG/HF corrections if needed; prefer a mixed model when data are missing or the repeated structure is more complex.",
        equivalence_option:
            "Use omnibus equivalence or planned paired TOSTs.",
    },
    {
        id: "A07",
        dv_count: "1",
        dv_kind: "continuous",
        iv_count: "1",
        iv_kind: "discrete",
        iv_levels: "gt2",
        design: "between",
        dv_parametric: "no",
        dv_subtype: "",
        route: "",
        status: "resolved",
        recommended_test: "Kruskal-Wallis test",
        what_it_does:
            "Nonparametric omnibus comparison for more than two independent groups.",
        r_code:
            'fit <- rstatix::kruskal_test(df, y ~ group)\nfit',
        python_code:
            'import pingouin as pg\npg.kruskal(data=df, dv="y", between="group")',
        bayes_test: "",
        bayes_r_code: "",
        bayes_python_code: "# not available: no standard maintained Python package provides a simple default Bayesian contingency-table test analogous to BayesFactor::contingencyTableBF",
        effect_sizes: "epsilon^2, eta^2(H)",
        follow_up_questions:
            "If significant, add pairwise post hocs with multiplicity correction.",
        equivalence_option: "",
    },
    {
        id: "A08",
        dv_count: "1",
        dv_kind: "continuous",
        iv_count: "1",
        iv_kind: "discrete",
        iv_levels: "gt2",
        design: "within",
        dv_parametric: "no",
        dv_subtype: "",
        route: "",
        status: "resolved",
        recommended_test: "Friedman test",
        what_it_does:
            "Nonparametric omnibus test for repeated measurements across >2 conditions.",
        r_code:
            'fit <- rstatix::friedman_test(df, y ~ condition | subject)\nfit',
        python_code:
            'import pingouin as pg\npg.friedman(data=df, dv="y", within="condition", subject="subject")',
        bayes_test: "",
        bayes_r_code: "",
        bayes_python_code: "# not available: no standard maintained Python package provides a simple default Bayesian contingency-table test analogous to BayesFactor::contingencyTableBF",
        effect_sizes: "Kendall's W",
        follow_up_questions:
            "If significant, add pairwise Wilcoxon signed-rank follow-ups with p-adjustment.",
        equivalence_option: "",
    },
    {
        id: "A09",
        dv_count: "1",
        dv_kind: "continuous",
        iv_count: "1",
        iv_kind: "continuous",
        iv_levels: "",
        design: "",
        dv_parametric: "yes",
        dv_subtype: "",
        route: "",
        status: "resolved",
        recommended_test: "Simple linear regression",
        what_it_does:
            "Models one continuous predictor for one continuous outcome.",
        r_code: "fit <- lm(y ~ x, data = df)\nsummary(fit)",
        python_code:
            'import statsmodels.formula.api as smf\nfit = smf.ols("y ~ x", data=df).fit()\nprint(fit.summary())',
        bayes_test: "Bayesian linear regression",
        bayes_r_code:
            "library(BayesFactor)\nlmBF(y ~ x, data = df)",
        bayes_python_code:
            'import bambi as bmb\nmodel = bmb.Model("y ~ x", df)\nidata = model.fit()',
        effect_sizes: "R^2, adjusted R^2, standardized beta, f^2",
        follow_up_questions:
            "Check linearity, heteroskedasticity, influential observations, and whether slope equivalence is of interest.",
        equivalence_option:
            "Usually via ROPE/HDI or SESOI for the slope.",
    },
    {
        id: "A10",
        dv_count: "1",
        dv_kind: "continuous",
        iv_count: "1",
        iv_kind: "continuous",
        iv_levels: "",
        design: "",
        dv_parametric: "no",
        dv_subtype: "",
        route: "association",
        status: "resolved",
        recommended_test: "Spearman rank correlation",
        what_it_does:
            "Quantifies monotonic association between two continuous variables without treating one variable as a modeled outcome with a slope parameter.",
        r_code: 'cor.test(df$x, df$y, method = "spearman", exact = FALSE)',
        python_code:
            'from scipy import stats\nstats.spearmanr(df["x"], df["y"])',
        bayes_test: "",
        bayes_r_code: "",
        bayes_python_code: "# not available: no standard maintained Python package provides a simple default Bayesian contingency-table test analogous to BayesFactor::contingencyTableBF",
        effect_sizes: "Spearman's rho",
        follow_up_questions:
            "Use this route only when the goal is association. If the goal is slope estimation or prediction, choose the robust simple regression route instead.",
        equivalence_option: "",
    },
    {
        id: "A10b",
        dv_count: "1",
        dv_kind: "continuous",
        iv_count: "1",
        iv_kind: "continuous",
        iv_levels: "",
        design: "",
        dv_parametric: "no",
        dv_subtype: "",
        route: "slope_estimation",
        status: "resolved",
        recommended_test: "Robust simple linear regression",
        what_it_does:
            "Estimates a directional slope for one continuous predictor when Gaussian linear-model assumptions are not credible because of outliers, heavy tails, or influential observations.",
        r_code: "fit <- robustbase::lmrob(y ~ x, data = df)\nsummary(fit)",
        python_code:
            'import statsmodels.formula.api as smf\nfit = smf.rlm("y ~ x", data=df).fit()\nprint(fit.summary())',
        bayes_test: "",
        bayes_r_code: "",
        bayes_python_code: "# not available: no standard maintained Python package provides a simple default Bayesian contingency-table test analogous to BayesFactor::contingencyTableBF",
        effect_sizes: "robust R^2, standardized beta",
        follow_up_questions:
            "Use this route only when the research goal is slope estimation or prediction. If you only need a monotonic association measure, prefer Spearman correlation instead.",
        equivalence_option: "",
    },
    {
        id: "A11",
        dv_count: "1",
        dv_kind: "continuous",
        iv_count: "ge2",
        iv_kind: "continuous",
        iv_levels: "",
        design: "",
        dv_parametric: "yes",
        dv_subtype: "",
        route: "",
        status: "resolved",
        recommended_test: "Multiple linear regression",
        what_it_does:
            "Models several continuous predictors for one continuous outcome.",
        r_code: "fit <- lm(y ~ x1 + x2 + x3, data = df)\nsummary(fit)",
        python_code:
            'import statsmodels.formula.api as smf\nfit = smf.ols("y ~ x1 + x2 + x3", data=df).fit()\nprint(fit.summary())',
        bayes_test: "Bayesian multiple regression",
        bayes_r_code:
            "library(BayesFactor)\nlmBF(y ~ x1 + x2 + x3, data = df)",
        bayes_python_code:
            'import bambi as bmb\nmodel = bmb.Model("y ~ x1 + x2 + x3", df)\nidata = model.fit()',
        effect_sizes: "R^2, adjusted R^2, f^2, semi-partial R^2",
        follow_up_questions:
            "Check collinearity, interactions, nonlinearity, and influence.",
        equivalence_option: "Usually via ROPE/HDI on coefficients.",
    },
    {
        id: "A12",
        dv_count: "1",
        dv_kind: "continuous",
        iv_count: "ge2",
        iv_kind: "continuous",
        iv_levels: "",
        design: "",
        dv_parametric: "no",
        dv_subtype: "",
        route: "robust_estimation",
        status: "resolved",
        recommended_test: "Robust multiple regression",
        what_it_does:
            "Estimates multiple-regression coefficients with outlier-resistant estimation when Gaussian-model assumptions are not acceptable but the target remains regression coefficients on the observed scale.",
        r_code: "fit <- robustbase::lmrob(y ~ x1 + x2 + x3, data = df)",
        python_code:
            'import statsmodels.formula.api as smf\nfit = smf.rlm("y ~ x1 + x2 + x3", data=df).fit()\nprint(fit.summary())',
        bayes_test: "",
        bayes_r_code: "",
        bayes_python_code: "# not available: no standard maintained Python package provides a simple default Bayesian contingency-table test analogous to BayesFactor::contingencyTableBF",
        effect_sizes: "robust R^2, standardized beta, semi-partial R^2",
        follow_up_questions:
            "Use this route when the main target is robust coefficient estimation. If you primarily want permutation-based p values under weak assumptions, choose the permutation regression branch instead.",
        equivalence_option: "",
    },
    {
        id: "A12b",
        dv_count: "1",
        dv_kind: "continuous",
        iv_count: "ge2",
        iv_kind: "continuous",
        iv_levels: "",
        design: "",
        dv_parametric: "no",
        dv_subtype: "",
        route: "permutation_inference",
        status: "resolved",
        recommended_test: "Permutation multiple regression",
        what_it_does:
            "Uses a regression model with permutation-based inference when the main goal is valid p values or confidence assessment under weak distributional assumptions rather than robust point estimation.",
        r_code: "fit <- permuco::lmp(y ~ x1 + x2 + x3, data = df)\nsummary(fit)",
        python_code:
            "# not recommended: no standard maintained Python implementation is provided here for a general permutation multiple-regression workflow\n# prefer the R route shown below when permutation-based inference is the primary goal",
        bayes_test: "",
        bayes_r_code: "",
        bayes_python_code: "# not available: no standard maintained Python package provides a simple default Bayesian contingency-table test analogous to BayesFactor::contingencyTableBF",
        effect_sizes: "R^2, partial R^2, standardized beta",
        follow_up_questions:
            "Use this route when permutation inference is the main goal. If the main need is outlier-resistant estimation, prefer robust multiple regression instead.",
        equivalence_option: "",
    },
    {
        id: "A13",
        dv_count: "1",
        dv_kind: "continuous",
        iv_count: "ge2",
        iv_kind: "discrete",
        iv_levels: "2_or_gt2",
        design: "between",
        dv_parametric: "yes",
        dv_subtype: "",
        route: "",
        status: "resolved",
        recommended_test: "Factorial ANOVA",
        what_it_does:
            "Tests main effects and interactions of multiple between-subject categorical IVs.",
        r_code: "library(car)\noptions(contrasts = c('contr.sum', 'contr.poly'))\nfit <- lm(y ~ A * B, data = df)\nAnova(fit, type = 3)",
        python_code:
            'import statsmodels.api as sm\nimport statsmodels.formula.api as smf\nfit = smf.ols("y ~ C(A, Sum) * C(B, Sum)", data=df).fit()\nsm.stats.anova_lm(fit, typ=3)',
        bayes_test: "Bayesian factorial ANOVA",
        bayes_r_code:
            "library(BayesFactor)\ngeneralTestBF(y ~ A * B, data = df)",
        bayes_python_code:
            'import bambi as bmb\nmodel = bmb.Model("y ~ A * B", df)\nidata = model.fit()',
        effect_sizes: "partial eta^2, omega^2, Cohen's f",
        follow_up_questions:
            "Probe interactions with simple effects or estimated marginal means; ensure your sums-of-squares choice matches the contrast coding and design.",
        equivalence_option:
            "Omnibus equivalence is possible after defining a bound.",
    },
    {
        id: "A14",
        dv_count: "1",
        dv_kind: "continuous",
        iv_count: "ge2",
        iv_kind: "discrete",
        iv_levels: "2_or_gt2",
        design: "within",
        dv_parametric: "yes",
        dv_subtype: "",
        route: "",
        status: "resolved",
        recommended_test:
            "Factorial repeated-measures ANOVA or linear mixed model",
        what_it_does:
            "Tests multiple within-subject categorical IVs and their interaction; a linear mixed model is often preferable with missing data or more complex repeated structures.",
        r_code: 'library(afex)\nfit_aov <- aov_ez(id = "subject", dv = "y", within = c("A","B"), data = df)\nfit_aov\n\n# or mixed model\nlibrary(lme4)\nfit_lmm <- lmer(y ~ A * B + (1|subject), data = df)\nsummary(fit_lmm)',
        python_code:
            'import pingouin as pg\npg.rm_anova(data=df, dv="y", within=["A","B"], subject="subject", detailed=True)\n\n# or mixed model\nimport statsmodels.formula.api as smf\nfit_lmm = smf.mixedlm("y ~ A * B", data=df, groups=df["subject"]).fit()\nprint(fit_lmm.summary())',
        bayes_test:
            "Bayesian repeated-measures ANOVA / multilevel Gaussian model",
        bayes_r_code:
            'library(BayesFactor)\nanovaBF(y ~ A * B + subject, data = df, whichRandom = "subject")',
        bayes_python_code:
            'import bambi as bmb\nmodel = bmb.Model("y ~ A * B + (1|subject)", df)\nidata = model.fit()',
        effect_sizes:
            "partial eta^2, generalized eta^2, marginal / conditional R^2",
        follow_up_questions:
            "For effects with >2 repeated levels, assess sphericity and use corrected dfs if needed; prefer a mixed model when observations are missing or the covariance structure is more complex.",
        equivalence_option: "",
    },
    {
        id: "A15",
        dv_count: "1",
        dv_kind: "continuous",
        iv_count: "ge2",
        iv_kind: "discrete",
        iv_levels: "2_or_gt2",
        design: "both",
        dv_parametric: "yes",
        dv_subtype: "",
        route: "",
        status: "resolved",
        recommended_test: "Linear mixed model",
        what_it_does:
            "Handles mixed designs with within- and between-subject categorical IVs on one continuous DV while accommodating incomplete or unbalanced repeated data more gracefully than classical mixed ANOVA.",
        r_code: "library(lme4)\nfit <- lmer(y ~ between_factor * within_factor + (1|subject), data = df)\nsummary(fit)\n\n# mixed ANOVA remains a special-case alternative for balanced complete data",
        python_code:
            'import statsmodels.formula.api as smf\nfit = smf.mixedlm("y ~ between_factor * within_factor", data=df, groups=df["subject"]).fit()\nprint(fit.summary())',
        bayes_test: "Bayesian Gaussian mixed model",
        bayes_r_code:
            "library(rstanarm)\nstan_glmer(y ~ between_factor * within_factor + (1|subject), data = df, family = gaussian())",
        bayes_python_code:
            'import bambi as bmb\nmodel = bmb.Model("y ~ between_factor * within_factor + (1|subject)", df)\nidata = model.fit()',
        effect_sizes: "marginal R^2, conditional R^2, standardized beta",
        follow_up_questions:
            "Treat mixed ANOVA as a special case for balanced complete data with simple covariance assumptions. In most practical datasets, stay with the linear mixed-model route and consider whether random slopes are needed.",
        equivalence_option:
            "Usually via ROPE/HDI on fixed effects.",
    },
    {
        id: "A16a",
        dv_count: "1",
        dv_kind: "continuous",
        iv_count: "ge2",
        iv_kind: "discrete",
        iv_levels: "2_or_gt2",
        design: "between",
        dv_parametric: "no",
        dv_subtype: "",
        route: "",
        status: "resolved",
        recommended_test: "Aligned rank transform (ART) factorial ANOVA",
        what_it_does:
            "Provides a nonparametric factorial route for purely categorical between-subject factors by fitting an aligned-rank-transform model and testing factorial terms on the aligned ranks.",
        r_code: "library(ARTool)\nfit <- art(y ~ A * B, data = df)\nanova(fit)",
        python_code:
            "# not recommended: no standard maintained Python implementation is available here for ART factorial ANOVA comparable to R ARTool\n# prefer the R route shown below",
        bayes_test: "",
        bayes_r_code: "",
        bayes_python_code: "# not available: no standard maintained Python package provides a simple default Bayesian contingency-table test analogous to BayesFactor::contingencyTableBF",
        effect_sizes: "No standard omnibus effect size",
        follow_up_questions:
            "Use ART only for purely categorical factors. Report aligned-rank test statistics and planned contrasts; if you need permutation inference instead, treat that as a separate analytical route.",
        equivalence_option: "",
    },
    {
        id: "A16b",
        dv_count: "1",
        dv_kind: "continuous",
        iv_count: "ge2",
        iv_kind: "discrete",
        iv_levels: "2_or_gt2",
        design: "within",
        dv_parametric: "no",
        dv_subtype: "",
        route: "",
        status: "resolved",
        recommended_test:
            "Aligned rank transform repeated-measures model",
        what_it_does:
            "Provides a nonparametric route for repeated-measures categorical factors via aligned ranks while keeping the subject structure explicit in the model specification.",
        r_code: "# ART with explicit repeated-measures structure\nlibrary(ARTool)\nfit <- art(y ~ A * B + Error(subject/(A*B)), data = df)\nanova(fit)",
        python_code:
            "# not recommended: no standard maintained Python implementation is available here for an ART repeated-measures model comparable to the R route shown below",
        bayes_test: "",
        bayes_r_code: "",
        bayes_python_code: "# not available: no standard maintained Python package provides a simple default Bayesian contingency-table test analogous to BayesFactor::contingencyTableBF",
        effect_sizes: "No standard omnibus effect size",
        follow_up_questions:
            "Model the repeated-measures structure explicitly and report aligned-rank test statistics or planned contrasts. If your main goal is permutation inference, treat that as a separate route.",
        equivalence_option: "",
    },
    {
        id: "A16c",
        dv_count: "1",
        dv_kind: "continuous",
        iv_count: "ge2",
        iv_kind: "discrete",
        iv_levels: "2_or_gt2",
        design: "both",
        dv_parametric: "no",
        dv_subtype: "",
        route: "",
        status: "resolved",
        recommended_test:
            "Aligned rank transform mixed-design model",
        what_it_does:
            "Provides a nonparametric route for mixed categorical designs by combining aligned ranks with an explicit clustering structure for repeated observations within subjects.",
        r_code: "# ART with explicit clustering structure\nlibrary(ARTool)\nfit <- art(y ~ between_factor * within_factor + Error(subject/within_factor), data = df)\nanova(fit)",
        python_code:
            "# not recommended: no standard maintained Python implementation is available here for an ART mixed-design model comparable to the R route shown below",
        bayes_test: "",
        bayes_r_code: "",
        bayes_python_code: "# not available: no standard maintained Python package provides a simple default Bayesian contingency-table test analogous to BayesFactor::contingencyTableBF",
        effect_sizes: "No standard omnibus effect size",
        follow_up_questions:
            "Model subject-level dependence explicitly and report aligned-rank omnibus results or planned contrasts. If permutation inference is the actual target, use a dedicated permutation workflow rather than treating it as the same method.",
        equivalence_option: "",
    },
    {
        id: "A17",
        dv_count: "1",
        dv_kind: "continuous",
        iv_count: "ge2",
        iv_kind: "both",
        iv_levels: "2_or_gt2_plus_cont",
        design: "between",
        dv_parametric: "yes",
        dv_subtype: "",
        route: "",
        status: "resolved",
        recommended_test: "ANCOVA / general linear model",
        what_it_does:
            "Combines categorical factors and continuous covariates for one continuous DV.",
        r_code: "fit <- lm(y ~ group * x1 + x2, data = df)\nsummary(fit)",
        python_code:
            'import statsmodels.formula.api as smf\nfit = smf.ols("y ~ C(group) * x1 + x2", data=df).fit()\nprint(fit.summary())',
        bayes_test:
            "Bayesian ANCOVA / regression with factors and covariates",
        bayes_r_code:
            "library(BayesFactor)\ngeneralTestBF(y ~ group * x1 + x2, data = df)",
        bayes_python_code:
            'import bambi as bmb\nmodel = bmb.Model("y ~ group * x1 + x2", df)\nidata = model.fit()',
        effect_sizes:
            "partial eta^2 for factors, standardized beta / R^2 for covariates",
        follow_up_questions:
            "Check homogeneity of regression slopes and probe interactions with simple slopes.",
        equivalence_option: "",
    },
    {
        id: "A18",
        dv_count: "1",
        dv_kind: "continuous",
        iv_count: "ge2",
        iv_kind: "both",
        iv_levels: "2_or_gt2_plus_cont",
        design: "both",
        dv_parametric: "yes",
        dv_subtype: "",
        route: "",
        status: "resolved",
        recommended_test: "Linear mixed model",
        what_it_does:
            "Handles repeated observations plus categorical and continuous predictors.",
        r_code: "library(lme4)\nfit <- lmer(y ~ between_factor * within_factor * x1 + (1|subject), data = df)\nsummary(fit)",
        python_code:
            'import statsmodels.formula.api as smf\nfit = smf.mixedlm("y ~ between_factor * within_factor * x1", data=df, groups=df["subject"]).fit()\nprint(fit.summary())',
        bayes_test: "Bayesian Gaussian mixed model",
        bayes_r_code:
            "library(rstanarm)\nstan_glmer(y ~ between_factor * within_factor * x1 + (1|subject), data = df, family = gaussian())",
        bayes_python_code:
            'import bambi as bmb\nmodel = bmb.Model("y ~ between_factor * within_factor * x1 + (1|subject)", df)\nidata = model.fit()',
        effect_sizes:
            "marginal R^2, conditional R^2, standardized beta, f^2",
        follow_up_questions:
            "Consider random slopes, missing repeated values, and follow-up contrasts.",
        equivalence_option: "",
    },
    {
        id: "A19",
        dv_count: "1",
        dv_kind: "continuous",
        iv_count: "ge2",
        iv_kind: "both",
        iv_levels: "2_or_gt2_plus_cont",
        design: "both",
        dv_parametric: "no",
        dv_subtype: "",
        route: "",
        status: "resolved",
        recommended_test: "Robust linear mixed model",
        what_it_does:
            "A robust mixed-model route for heavy tails, outliers, or heterogeneity in repeated / mixed designs.",
        r_code: "library(robustlmm)\nfit <- rlmer(y ~ between_factor * within_factor * x1 + (1|subject), data = df)\nsummary(fit)",
        python_code:
            "# not recommended: no standard maintained Python implementation is available here for a Gaussian robust mixed model comparable to robustlmm::rlmer\n# prefer the R route shown below",
        bayes_test: "",
        bayes_r_code: "",
        bayes_python_code: "# not available: no standard maintained Python package provides a simple default Bayesian contingency-table test analogous to BayesFactor::contingencyTableBF",
        effect_sizes:
            "marginal R^2, conditional R^2, standardized beta",
        follow_up_questions:
            "Use when repeated or mixed designs are continuous-DV problems with clear outlier sensitivity. No standard maintained frequentist Python implementation is recommended here.",
        equivalence_option: "",
    },
    {
        id: "A20",
        dv_count: "1",
        dv_kind: "continuous",
        iv_count: "ge2",
        iv_kind: "both",
        iv_levels: "2_or_gt2_plus_cont",
        design: "between",
        dv_parametric: "no",
        dv_subtype: "",
        route: "",
        status: "resolved",
        recommended_test:
            "Permutation-based general linear model (including permutation ANCOVA as a special case)",
        what_it_does:
            "Tests effects of categorical factors and continuous covariates on one continuous DV using permutation-based inference when the main goal is permutation-valid p values rather than robust coefficient estimation.",
        r_code: "# permutation-based linear model\nlibrary(permuco)\nfit <- lmp(y ~ group + x1, data = df)\nsummary(fit)",
        python_code:
            "# not recommended: no standard maintained Python implementation is provided here for a general permutation GLM / permutation ANCOVA workflow\n# prefer the R route shown below when permutation inference is the primary goal",
        bayes_test: "",
        bayes_r_code: "",
        bayes_python_code: "# not available: no standard maintained Python package provides a simple default Bayesian contingency-table test analogous to BayesFactor::contingencyTableBF",
        effect_sizes:
            "partial R^2, model R^2, permutation-based effect summaries",
        follow_up_questions:
            "Use this route when permutation inference is the main target. If the main need is robust estimation rather than permutation-based p values, use a robust regression route instead.",
        equivalence_option: "",
    },
    {
        id: "D01",
        dv_count: "1",
        dv_kind: "discrete",
        iv_count: "1",
        iv_kind: "discrete",
        iv_levels: "2_or_gt2",
        design: "between",
        dv_parametric: "",
        dv_subtype: "",
        route: "",
        status: "resolved",
        recommended_test:
            "Chi-square test of independence; Fisher exact test for small 2x2 tables",
        what_it_does:
            "Tests association between two categorical variables in independent observations. Use the chi-square test as the default for contingency tables; use Fisher's exact test mainly for small 2x2 tables.",
        r_code: "tab <- table(df$dv, df$iv)\nchisq.test(tab)\n# for small 2x2 tables:\n# fisher.test(tab)",
        python_code:
            'import pandas as pd\nfrom scipy.stats import chi2_contingency, fisher_exact\n\ntab = pd.crosstab(df["dv"], df["iv"])\nchi2_contingency(tab)\n\n# for small 2x2 tables:\n# fisher_exact(tab.to_numpy())',
        bayes_test: "Bayesian contingency-table test",
        bayes_r_code:
            'library(BayesFactor)\ncontingencyTableBF(tab, sampleType = "jointMulti")',
        bayes_python_code: "# not available: no standard maintained Python package provides a simple default Bayesian contingency-table test analogous to BayesFactor::contingencyTableBF",
        effect_sizes: "phi, Cramer's V, odds ratio (2x2)",
        follow_up_questions:
            "Check expected cell counts and whether ordered categories need an ordinal model instead.",
        equivalence_option:
            "For proportions, use explicit equivalence testing on proportions rather than chi-square.",
    },
    {
        id: "D02",
        dv_count: "1",
        dv_kind: "discrete",
        iv_count: "1",
        iv_kind: "discrete",
        iv_levels: "2",
        design: "within",
        dv_parametric: "",
        dv_subtype: "binary",
        route: "",
        status: "resolved",
        recommended_test: "McNemar test",
        what_it_does: "Tests paired binary categorical outcomes.",
        r_code: "tab <- table(df$before, df$after)\nmcnemar.test(tab)",
        python_code:
            "from statsmodels.stats.contingency_tables import mcnemar\nmcnemar(tab, exact=True)",
        bayes_test: "",
        bayes_r_code: "",
        bayes_python_code: "# not available: no standard maintained Python package provides a simple default Bayesian contingency-table test analogous to BayesFactor::contingencyTableBF",
        effect_sizes: "Cohen's g",
        follow_up_questions:
            "Use exact McNemar when discordant counts are small.",
        equivalence_option: "",
    },
    {
        id: "D03",
        dv_count: "1",
        dv_kind: "discrete",
        iv_count: "1",
        iv_kind: "discrete",
        iv_levels: "gt2",
        design: "within",
        dv_parametric: "",
        dv_subtype: "nominal",
        route: "",
        status: "resolved",
        recommended_test:
            "Stuart-Maxwell test of marginal homogeneity or Bowker-type symmetry test",
        what_it_does:
            "For paired nominal outcomes with more than two matched categories in a square table, Stuart-Maxwell targets marginal homogeneity, whereas Bowker-type symmetry tests target symmetry of the full off-diagonal pattern.",
        r_code: "tab <- table(df$before, df$after)\n\n# marginal homogeneity\nDescTools::StuartMaxwellTest(tab)\n\n# symmetry of the full square table (Bowker-type omnibus)\nrcompanion::nominalSymmetryTest(tab, exact = FALSE)",
        python_code:
            "from statsmodels.stats.contingency_tables import SquareTable\nsq = SquareTable(tab)\nsq.homogeneity()   # Stuart-Maxwell / marginal homogeneity\n# sq.symmetry()    # Bowker / symmetry",
        bayes_test: "",
        bayes_r_code: "",
        bayes_python_code: "# not available: no standard maintained Python package provides a simple default Bayesian contingency-table test analogous to BayesFactor::contingencyTableBF",
        effect_sizes: "No standard omnibus effect size",
        follow_up_questions:
            "Choose Stuart-Maxwell for marginal homogeneity and Bowker-type symmetry only when symmetry of the full square table is the target. Report the omnibus statistic and inspect off-diagonal asymmetries rather than forcing a generic effect-size label.",
        equivalence_option: "",
    },
    {
        id: "D04",
        dv_count: "1",
        dv_kind: "discrete",
        iv_count: "ge2",
        iv_kind: "both",
        iv_levels: "",
        design: "between",
        dv_parametric: "",
        dv_subtype: "binary",
        route: "",
        status: "resolved",
        recommended_test: "Logistic regression",
        what_it_does:
            "Models a binary DV from one or more predictors.",
        r_code: "fit <- glm(y ~ x1 + group, data = df, family = binomial())\nsummary(fit)",
        python_code:
            'import statsmodels.formula.api as smf\nfit = smf.logit("y ~ x1 + C(group)", data=df).fit()\nprint(fit.summary())',
        bayes_test: "Bayesian logistic regression",
        bayes_r_code:
            "library(rstanarm)\nstan_glm(y ~ x1 + group, data = df, family = binomial())",
        bayes_python_code:
            'import bambi as bmb\nmodel = bmb.Model("y ~ x1 + group", df, family="bernoulli")\nidata = model.fit()',
        effect_sizes: "odds ratios, pseudo-R^2",
        follow_up_questions:
            "Check separation, calibration, and whether random effects are needed for clustering.",
        equivalence_option:
            "Define equivalence on log-odds or predicted probabilities.",
    },
    {
        id: "D05",
        dv_count: "1",
        dv_kind: "discrete",
        iv_count: "ge2",
        iv_kind: "both",
        iv_levels: "",
        design: "between",
        dv_parametric: "",
        dv_subtype: "count",
        route: "",
        status: "resolved",
        recommended_test: "Count regression (Poisson or negative binomial)",
        what_it_does:
            "Models count outcomes from predictors. Start with Poisson when the mean-variance relation is plausible; switch to negative binomial when overdispersion is material.",
        r_code: "fit_pois <- glm(y ~ x1 + group, data = df, family = poisson())\nsummary(fit_pois)\n\nfit_nb <- MASS::glm.nb(y ~ x1 + group, data = df)\nsummary(fit_nb)",
        python_code:
            'import statsmodels.formula.api as smf\nfit_pois = smf.poisson("y ~ x1 + C(group)", data=df).fit()\nprint(fit_pois.summary())\n\nfit_nb = smf.negativebinomial("y ~ x1 + C(group)", data=df).fit()\nprint(fit_nb.summary())',
        bayes_test: "Bayesian count regression",
        bayes_r_code:
            "library(rstanarm)\nstan_glm(y ~ x1 + group, data = df, family = poisson())",
        bayes_python_code:
            'import bambi as bmb\nmodel = bmb.Model("y ~ x1 + group", df, family="poisson")\nidata = model.fit()',
        effect_sizes: "incidence rate ratios, pseudo-R^2",
        follow_up_questions:
            "Check overdispersion first, then decide whether a negative-binomial model is preferable to Poisson. Also inspect zero inflation before treating either model as final.",
        equivalence_option:
            "Define equivalence on log-rate or IRR scale.",
    },
    {
        id: "D06",
        dv_count: "1",
        dv_kind: "discrete",
        iv_count: "ge2",
        iv_kind: "both",
        iv_levels: "",
        design: "between",
        dv_parametric: "",
        dv_subtype: "ordinal",
        route: "",
        status: "resolved",
        recommended_test: "Ordinal regression",
        what_it_does: "Models ordered categorical outcomes.",
        r_code: "library(MASS)\nfit <- polr(as.ordered(y) ~ x1 + group, data = df, Hess = TRUE)\nsummary(fit)",
        python_code:
            "import pandas as pd\nfrom statsmodels.miscmodels.ordinal_model import OrderedModel\n\n# y must be ordered (for example a pandas Categorical with ordered=True)\nX = df[[\"x1\"]].join(pd.get_dummies(df[\"group\"], drop_first=True))\nmod = OrderedModel(df[\"y\"], X, distr=\"logit\")\nfit = mod.fit(method=\"bfgs\")\nprint(fit.summary())",
        bayes_test: "Bayesian ordinal regression",
        bayes_r_code:
            "library(rstanarm)\nstan_polr(y ~ x1 + group, data = df)",
        bayes_python_code:
            'import bambi as bmb\nmodel = bmb.Model("y ~ x1 + group", df, family="cumulative")\nidata = model.fit()',
        effect_sizes: "odds ratios, pseudo-R^2",
        follow_up_questions:
            "Check proportional odds assumption or consider a partial proportional-odds model.",
        equivalence_option: "",
    },
    {
        id: "D07",
        dv_count: "1",
        dv_kind: "discrete",
        iv_count: "ge2",
        iv_kind: "both",
        iv_levels: "",
        design: "between",
        dv_parametric: "",
        dv_subtype: "nominal",
        route: "",
        status: "resolved",
        recommended_test: "Multinomial logistic regression",
        what_it_does:
            "Models unordered categorical outcomes with more than two categories.",
        r_code: "library(nnet)\nfit <- multinom(y ~ x1 + group, data = df)",
        python_code:
            "import statsmodels.formula.api as smf\n\nfit = smf.mnlogit(\"y ~ x1 + C(group)\", data=df).fit()\nprint(fit.summary())",
        bayes_test: "Bayesian multinomial regression",
        bayes_r_code:
            "library(brms)\nfit <- brm(y ~ x1 + group, data = df, family = categorical())",
        bayes_python_code: "import bambi as bmb\n\nmodel = bmb.Model(\"y ~ x1 + group\", df, family=\"categorical\")\nidata = model.fit()",
        effect_sizes: "relative risk ratios, pseudo-R^2",
        follow_up_questions:
            "Check sparse cells and interpret category-specific contrasts carefully.",
        equivalence_option: "",
    },
    {
        id: "D08",
        dv_count: "1",
        dv_kind: "discrete",
        iv_count: "ge2",
        iv_kind: "both",
        iv_levels: "",
        design: "both",
        dv_parametric: "",
        dv_subtype: "binary",
        route: "",
        status: "resolved",
        recommended_test:
            "Correlated-data logistic modeling (GEE for marginal effects; GLMM for subject-specific effects)",
        what_it_does:
            "Models a binary DV with correlated observations, but the estimand must be chosen first: GEE gives population-average marginal effects, whereas GLMM gives subject-specific conditional effects. These coefficients are not interchangeable.",
        r_code: "# GEE (marginal)\nlibrary(geepack)\nfit_gee <- geeglm(y ~ x1 + group, id = subject, family = binomial(), data = df)\nsummary(fit_gee)\n\n# GLMM (subject-specific)\nlibrary(lme4)\nfit_glmm <- glmer(y ~ x1 + group + (1|subject), family = binomial(), data = df)\nsummary(fit_glmm)",
        python_code:
            '# Marginal model (GEE)\nimport statsmodels.api as sm\nimport statsmodels.formula.api as smf\nfit_gee = smf.gee("y ~ x1 + group", groups="subject", data=df, family=sm.families.Binomial()).fit()\nprint(fit_gee.summary())\n\n# Subject-specific logistic GLMM\n# No standard maintained frequentist Python implementation is recommended here in this app.\n# Prefer the R route shown below (lme4::glmer) or the Bayesian Python route in the Bayes column.',
        bayes_test: "Bayesian logistic mixed model",
        bayes_r_code:
            "library(rstanarm)\nfit_b <- stan_glmer(y ~ x1 + group + (1|subject), data = df, family = binomial())",
        bayes_python_code:
            'import bambi as bmb\nmodel = bmb.Model("y ~ x1 + group + (1|subject)", df, family="bernoulli")\nidata = model.fit()',
        effect_sizes: "Odds ratios, pseudo-R^2",
        follow_up_questions:
            "Decide the estimand before fitting the model: marginal GEE for population-average effects or GLMM for subject-specific effects. Also check working-correlation assumptions, separation, and convergence.",
        equivalence_option: "",
    },
    {
        id: "D09",
        dv_count: "1",
        dv_kind: "discrete",
        iv_count: "ge2",
        iv_kind: "both",
        iv_levels: "",
        design: "both",
        dv_parametric: "",
        dv_subtype: "count",
        route: "",
        status: "resolved",
        recommended_test:
            "Correlated-data count modeling (GEE for marginal effects; GLMM for subject-specific effects)",
        what_it_does:
            "Models a count DV with correlated observations, but the estimand must be chosen first: GEE gives marginal population-average effects, whereas count GLMMs give subject-specific conditional effects. These are not interchangeable, and overdispersion may require a negative-binomial mixed model rather than Poisson.",
        r_code: "# GEE count model (marginal)\nlibrary(geepack)\nfit_gee <- geeglm(y ~ x1 + group, id = subject, family = poisson(), data = df)\nsummary(fit_gee)\n\n# Count GLMM (subject-specific)\nlibrary(lme4)\nfit_glmm <- glmer(y ~ x1 + group + (1|subject), family = poisson(), data = df)\nsummary(fit_glmm)\n\n# for overdispersed counts, prefer glmmTMB::glmmTMB(..., family = nbinom2)",
        python_code:
            '# Marginal count model (GEE)\nimport statsmodels.api as sm\nimport statsmodels.formula.api as smf\nfit_gee = smf.gee("y ~ x1 + group", groups="subject", data=df, family=sm.families.Poisson()).fit()\nprint(fit_gee.summary())\n\n# Subject-specific count GLMM\n# No standard maintained frequentist Python implementation is recommended here in this app.\n# Prefer the R route shown below for Poisson / negative-binomial mixed models, or use the Bayesian Python route in the Bayes column.',
        bayes_test: "Bayesian count mixed model",
        bayes_r_code:
            "library(rstanarm)\nfit_b <- stan_glmer(y ~ x1 + group + (1|subject), data = df, family = poisson())",
        bayes_python_code:
            'import bambi as bmb\nmodel = bmb.Model("y ~ x1 + group + (1|subject)", df, family="poisson")\nidata = model.fit()',
        effect_sizes: "Incidence rate ratios, pseudo-R^2",
        follow_up_questions:
            "Choose the estimand first: marginal GEE or subject-specific GLMM. Then inspect overdispersion and zero inflation before deciding whether Poisson is still adequate.",
        equivalence_option: "",
    },
    {
        id: "M01",
        dv_count: "ge2",
        dv_kind: "continuous",
        iv_count: "1",
        iv_kind: "discrete",
        iv_levels: "2_or_gt2",
        design: "between",
        dv_parametric: "yes",
        dv_subtype: "",
        route: "",
        status: "resolved",
        recommended_test: "MANOVA",
        what_it_does:
            "Tests group differences on a multivariate continuous outcome profile.",
        r_code: 'fit <- manova(cbind(y1, y2) ~ group, data = df)\nsummary(fit, test = "Pillai")',
        python_code:
            'from statsmodels.multivariate.manova import MANOVA\nMANOVA.from_formula("y1 + y2 ~ group", data=df).mv_test()',
        bayes_test: "",
        bayes_r_code: "",
        bayes_python_code: "# not available: no standard maintained Python package provides a simple default Bayesian contingency-table test analogous to BayesFactor::contingencyTableBF",
        effect_sizes:
            "Pillai trace / Wilks etc.; then univariate effect sizes",
        follow_up_questions:
            "Check whether the DVs are sufficiently related to justify a multivariate omnibus test.",
        equivalence_option: "",
    },
    {
        id: "M02",
        dv_count: "ge2",
        dv_kind: "continuous",
        iv_count: "1",
        iv_kind: "discrete",
        iv_levels: "2_or_gt2",
        design: "between",
        dv_parametric: "no",
        dv_subtype: "",
        route: "",
        status: "resolved",
        recommended_test: "Distance-based PERMANOVA",
        what_it_does:
            "Permutation-based multivariate group comparison using a chosen distance matrix rather than the raw outcome vectors directly.",
        r_code: "library(vegan)\nadonis2(dist_mat ~ group, data = meta)",
        python_code:
            "from skbio import DistanceMatrix\nfrom skbio.stats.distance import permanova\n\n# dist_mat must be a square distance matrix and metadata must align with its IDs\ndm = DistanceMatrix(dist_mat, ids=meta.index.astype(str))\nres = permanova(dm, grouping=meta, column=\"group\", permutations=9999)\nprint(res)",
        bayes_test: "",
        bayes_r_code: "",
        bayes_python_code: "# not available: no standard maintained Python package provides a simple default Bayesian contingency-table test analogous to BayesFactor::contingencyTableBF",
        effect_sizes: "pseudo-R^2",
        follow_up_questions:
            "Choose the distance metric carefully and inspect multivariate dispersion, because significant results can reflect differences in spread as well as centroid location.",
        equivalence_option: "",
    },
    {
        id: "M03",
        dv_count: "ge2",
        dv_kind: "continuous",
        iv_count: "ge2",
        iv_kind: "discrete",
        iv_levels: "2_or_gt2",
        design: "between",
        dv_parametric: "yes",
        dv_subtype: "",
        route: "",
        status: "resolved",
        recommended_test: "Factorial MANOVA",
        what_it_does:
            "Tests multivariate main effects and interactions of multiple categorical IVs.",
        r_code: 'fit <- manova(cbind(y1, y2) ~ A * B, data = df)\nsummary(fit, test = "Pillai")',
        python_code:
            'from statsmodels.multivariate.manova import MANOVA\nMANOVA.from_formula("y1 + y2 ~ A * B", data=df).mv_test()',
        bayes_test: "",
        bayes_r_code: "",
        bayes_python_code: "# not available: no standard maintained Python package provides a simple default Bayesian contingency-table test analogous to BayesFactor::contingencyTableBF",
        effect_sizes:
            "Pillai trace / Wilks etc.; then univariate effect sizes",
        follow_up_questions:
            "Probe interactions with protected follow-up models if the omnibus is significant.",
        equivalence_option: "",
    },
    {
        id: "M04",
        dv_count: "ge2",
        dv_kind: "continuous",
        iv_count: "ge2",
        iv_kind: "discrete",
        iv_levels: "2_or_gt2",
        design: "between",
        dv_parametric: "no",
        dv_subtype: "",
        route: "",
        status: "resolved",
        recommended_test: "Distance-based factorial PERMANOVA",
        what_it_does:
            "Permutation-based multivariate factorial analysis using a chosen distance matrix.",
        r_code: "library(vegan)\nadonis2(dist_mat ~ A * B, data = meta)",
        python_code:
            "# scikit-bio permanova supports one grouping factor at a time\n# not available: general formula-style factorial PERMANOVA in mainstream Python stats packages\n# for factorial designs, use R vegan::adonis2(...)",
        bayes_test: "",
        bayes_r_code: "",
        bayes_python_code: "# not available: no standard maintained Python package provides a simple default Bayesian contingency-table test analogous to BayesFactor::contingencyTableBF",
        effect_sizes: "pseudo-R^2",
        follow_up_questions:
            "Inspect multivariate dispersion because significant results can reflect dispersion differences as well as centroid differences; choose the distance metric deliberately.",
        equivalence_option: "",
    },
    {
        id: "M05",
        dv_count: "ge2",
        dv_kind: "continuous",
        iv_count: "ge2",
        iv_kind: "both",
        iv_levels: "2_or_gt2_plus_cont",
        design: "between",
        dv_parametric: "yes",
        dv_subtype: "",
        route: "",
        status: "resolved",
        recommended_test:
            "Factorial MANCOVA / multivariate multiple regression",
        what_it_does:
            "Multivariate general linear model with factors and covariates.",
        r_code: 'fit <- manova(cbind(y1, y2) ~ group * x1 + x2, data = df)\nsummary(fit, test = "Pillai")',
        python_code:
            'from statsmodels.multivariate.manova import MANOVA\nMANOVA.from_formula("y1 + y2 ~ group * x1 + x2", data=df).mv_test()',
        bayes_test: "",
        bayes_r_code: "",
        bayes_python_code: "# not available: no standard maintained Python package provides a simple default Bayesian contingency-table test analogous to BayesFactor::contingencyTableBF",
        effect_sizes:
            "Pillai trace / Wilks etc.; then univariate effect sizes",
        follow_up_questions:
            "Check whether the multivariate omnibus is more appropriate than separate outcome models.",
        equivalence_option: "",
    },
];

/* =============================
   Structured post-hoc metadata
   ============================= */
const posthoc_output_schema = {
    version: "1.0",
    default_fields_sequence: [
        "contrast_label",
        "group1",
        "group2",
        "estimate",
        "SE",
        "df",
        "statistic",
        "p_raw",
        "p_adj",
        "conf_low",
        "conf_high",
        "effect_name",
        "effect_value",
    ],
    model_based_fields: [
        "estimate_scale",
        "adjust_method",
        "target_term",
        "by_factors",
    ],
    fields: {
        contrast_label: {
            label: "contrast_label",
            title: "contrast_label",
            type: "string",
            description: "Human-readable label for the contrast."
        },
        group1: {
            label: "group1",
            title: "group1",
            type: "string",
            description: "First level, row category, or left-hand contrast term."
        },
        group2: {
            label: "group2",
            title: "group2",
            type: "string",
            description: "Second level, comparison target, or right-hand contrast term."
        },
        estimate: {
            label: "estimate",
            title: "estimate",
            type: "numeric",
            description: "Estimated contrast on the declared scale."
        },
        SE: {
            label: "SE",
            title: "SE",
            type: "numeric",
            description: "Standard error of the contrast estimate."
        },
        df: {
            label: "df",
            title: "df",
            type: "string",
            description: "Degrees of freedom or an asymptotic marker if no finite df are used."
        },
        statistic: {
            label: "statistic",
            title: "statistic",
            type: "numeric_or_string",
            description: "t, z, W, chi-square, or related contrast statistic."
        },
        p_raw: {
            label: "p_raw",
            title: "p_raw",
            type: "numeric",
            description: "Unadjusted p-value before multiplicity control."
        },
        p_adj: {
            label: "p_adj",
            title: "p_adj",
            type: "numeric",
            description: "Multiplicity-adjusted p-value."
        },
        conf_low: {
            label: "conf_low",
            title: "conf_low",
            type: "numeric",
            description: "Lower interval bound on the declared estimate scale."
        },
        conf_high: {
            label: "conf_high",
            title: "conf_high",
            type: "numeric",
            description: "Upper interval bound on the declared estimate scale."
        },
        effect_name: {
            label: "effect_name",
            title: "effect_name",
            type: "string",
            description: "Name of the local effect size attached to the contrast."
        },
        effect_value: {
            label: "effect_value",
            title: "effect_value",
            type: "numeric_or_string",
            description: "Value of the effect-size summary."
        },
    },
};
const PROCEDURE_OUTPUT_FIELDS = posthoc_output_schema.default_fields_sequence.slice();

const posthoc_families = {
    all_pairs: {
        family_type: "all_pairs",
        family_scope:
            "All pairwise contrasts within one target factor. By-groups define separate families unless cross-adjust is explicitly requested.",
        adjust_method_default: "holm",
        adjust_method_allowed: [
            "holm",
            "bonferroni",
            "BH",
            "BY",
            "tukey",
            "games-howell",
            "mvt",
        ],
        cross_adjust_supported: true,
        alpha_default: 0.05,
        conf_level_default: 0.95,
    },
    many_to_one: {
        family_type: "many_to_one",
        family_scope:
            "Treatment-vs-control or many-to-one comparisons against one declared control level.",
        adjust_method_default: "holm",
        adjust_method_allowed: [
            "holm",
            "bonferroni",
            "dunnett",
            "mvt",
        ],
        cross_adjust_supported: false,
        alpha_default: 0.05,
        conf_level_default: 0.95,
    },
    simple_effects: {
        family_type: "simple_effects",
        family_scope:
            "Simple-effect contrasts within slices of another factor or conditioning structure.",
        adjust_method_default: "holm",
        adjust_method_allowed: [
            "holm",
            "bonferroni",
            "BH",
            "BY",
            "mvt",
        ],
        cross_adjust_supported: true,
        alpha_default: 0.05,
        conf_level_default: 0.95,
    },
    custom: {
        family_type: "custom",
        family_scope:
            "User-declared custom contrasts, residual-based localizations, or other non-default follow-up families.",
        adjust_method_default: "holm",
        adjust_method_allowed: [
            "holm",
            "bonferroni",
            "BH",
            "BY",
            "mvt",
        ],
        cross_adjust_supported: true,
        alpha_default: 0.05,
        conf_level_default: 0.95,
    },
    trend: {
        family_type: "trend",
        family_scope:
            "Ordered-factor or dose-trend families, typically kept separate from generic all-pairs contrasts.",
        adjust_method_default: "holm",
        adjust_method_allowed: [
            "holm",
            "bonferroni",
            "BH",
            "BY",
        ],
        cross_adjust_supported: false,
        alpha_default: 0.05,
        conf_level_default: 0.95,
    },
    pairwise_by_factor: {
        family_type: "pairwise_by_factor",
        family_scope:
            "Pairwise contrasts within a conditioning factor, matched block, or specific table margin.",
        adjust_method_default: "holm",
        adjust_method_allowed: [
            "holm",
            "bonferroni",
            "BH",
            "BY",
            "games-howell",
            "nemenyi",
        ],
        cross_adjust_supported: true,
        alpha_default: 0.05,
        conf_level_default: 0.95,
    },
};

const posthoc_catalog = {
    ph_model_pairwise_emmeans: {
        id: "ph_model_pairwise_emmeans",
        label: "Pairwise estimated marginal means",
        applies_to: [
            "A05",
            "A06",
            "A13",
            "A14",
            "A15",
            "A17",
            "A18",
            "D04",
            "D05",
            "D06",
            "D07",
            "D08",
            "D09",
        ],
        parent_test: "Model-based contrast engine",
        model_class: "model_based",
        trigger: {
            omnibus_required: true,
            interaction_context: false,
            requires_significant_omnibus: true,
        },
        family_type: "all_pairs",
        contrast_scope: "factor",
        target_term: "target_factor",
        by_factors: [],
        control_level_required: false,
        supports_unbalanced: true,
        supports_heteroscedasticity: true,
        parametric: true,
        repeated_measures: false,
        multiplicity: {
            default: "holm",
            allowed: [
                "holm",
                "bonferroni",
                "BH",
                "BY",
                "tukey",
                "mvt",
            ],
        },
        effect_sizes: ["estimate"],
        output_fields: PROCEDURE_OUTPUT_FIELDS,
        notes:
            "Model-based pairwise contrasts computed from estimated marginal means or an equivalent marginal-contrast engine rather than raw means.",
    },
    ph_model_simple_effects: {
        id: "ph_model_simple_effects",
        label: "Simple effects",
        applies_to: [
            "A06",
            "A13",
            "A14",
            "A15",
            "A17",
            "A18",
            "D04",
            "D05",
            "D06",
            "D07",
            "D08",
            "D09",
        ],
        parent_test: "Model-based contrast engine",
        model_class: "model_based",
        trigger: {
            omnibus_required: true,
            interaction_context: true,
            requires_significant_omnibus: true,
        },
        family_type: "simple_effects",
        contrast_scope: "factor",
        target_term: "target_factor",
        by_factors: [],
        control_level_required: false,
        supports_unbalanced: true,
        supports_heteroscedasticity: true,
        parametric: true,
        repeated_measures: false,
        multiplicity: {
            default: "holm",
            allowed: [
                "holm",
                "bonferroni",
                "BH",
                "BY",
                "mvt",
            ],
        },
        effect_sizes: ["estimate"],
        output_fields: PROCEDURE_OUTPUT_FIELDS,
        notes:
            "Default interaction follow-up family for factorial, repeated, mixed, and generalized linear models when the target term is conditioned on one or more by-factors.",
    },
    ph_model_interaction_slices: {
        id: "ph_model_interaction_slices",
        label: "Interaction slices",
        applies_to: [
            "A06",
            "A13",
            "A14",
            "A15",
            "A17",
            "A18",
            "D04",
            "D05",
            "D06",
            "D07",
            "D08",
            "D09",
        ],
        parent_test: "Model-based contrast engine",
        model_class: "model_based",
        trigger: {
            omnibus_required: true,
            interaction_context: true,
            requires_significant_omnibus: true,
        },
        family_type: "simple_effects",
        contrast_scope: "interaction_slice",
        target_term: "target_factor",
        by_factors: [],
        control_level_required: false,
        supports_unbalanced: true,
        supports_heteroscedasticity: true,
        parametric: true,
        repeated_measures: false,
        multiplicity: {
            default: "holm",
            allowed: [
                "holm",
                "bonferroni",
                "BH",
                "BY",
                "mvt",
            ],
        },
        effect_sizes: ["estimate"],
        output_fields: PROCEDURE_OUTPUT_FIELDS,
        notes:
            "Slice-based follow-up contrasts for interaction terms, kept as separate multiplicity families by conditioning set.",
    },
    ph_model_custom_contrasts: {
        id: "ph_model_custom_contrasts",
        label: "Custom contrasts",
        applies_to: [
            "A05",
            "A06",
            "A13",
            "A14",
            "A15",
            "A17",
            "A18",
            "D04",
            "D05",
            "D06",
            "D07",
            "D08",
            "D09",
        ],
        parent_test: "Model-based contrast engine",
        model_class: "model_based",
        trigger: {
            omnibus_required: false,
            interaction_context: false,
            requires_significant_omnibus: false,
        },
        family_type: "custom",
        contrast_scope: "custom",
        target_term: "target_factor",
        by_factors: [],
        control_level_required: false,
        supports_unbalanced: true,
        supports_heteroscedasticity: true,
        parametric: true,
        repeated_measures: false,
        multiplicity: {
            default: "holm",
            allowed: [
                "holm",
                "bonferroni",
                "BH",
                "BY",
                "mvt",
            ],
        },
        effect_sizes: ["estimate"],
        output_fields: PROCEDURE_OUTPUT_FIELDS,
        notes:
            "General contrast layer for planned or custom coefficient vectors, model matrices, or named contrast sets.",
    },
    ph_model_treatment_vs_control: {
        id: "ph_model_treatment_vs_control",
        label: "Treatment vs control contrasts",
        applies_to: [
            "A05",
            "A06",
            "A13",
            "A14",
            "A15",
            "A17",
            "A18",
            "D04",
            "D05",
            "D06",
            "D07",
            "D08",
            "D09",
        ],
        parent_test: "Model-based contrast engine",
        model_class: "model_based",
        trigger: {
            omnibus_required: true,
            interaction_context: false,
            requires_significant_omnibus: true,
        },
        family_type: "many_to_one",
        contrast_scope: "factor",
        target_term: "target_factor",
        by_factors: [],
        control_level_required: true,
        supports_unbalanced: true,
        supports_heteroscedasticity: true,
        parametric: true,
        repeated_measures: false,
        multiplicity: {
            default: "holm",
            allowed: [
                "holm",
                "bonferroni",
                "dunnett",
                "mvt",
            ],
        },
        effect_sizes: ["estimate"],
        output_fields: PROCEDURE_OUTPUT_FIELDS,
        notes:
            "Model-based treatment-vs-control family for factors with one declared reference or control level.",
    },
    ph_model_trend_tests: {
        id: "ph_model_trend_tests",
        label: "Trend tests",
        applies_to: [
            "A05",
            "A06",
            "A13",
            "A14",
            "A15",
            "A17",
            "A18",
            "D04",
            "D05",
            "D06",
            "D07",
            "D08",
            "D09",
        ],
        parent_test: "Model-based contrast engine",
        model_class: "model_based",
        trigger: {
            omnibus_required: false,
            interaction_context: false,
            requires_significant_omnibus: false,
        },
        family_type: "trend",
        contrast_scope: "ordered_factor",
        target_term: "target_factor",
        by_factors: [],
        control_level_required: false,
        supports_unbalanced: true,
        supports_heteroscedasticity: true,
        parametric: true,
        repeated_measures: false,
        multiplicity: {
            default: "holm",
            allowed: [
                "holm",
                "bonferroni",
                "BH",
                "BY",
            ],
        },
        effect_sizes: ["estimate"],
        output_fields: PROCEDURE_OUTPUT_FIELDS,
        ui_enabled: false,
        notes:
            "Placeholder structure for ordered-factor trend contrasts. Stored now for extension, but not yet active in the UI.",
    },
    ph_a05_tukey_hsd: {
        id: "ph_a05_tukey_hsd",
        label: "Tukey HSD / Tukey-Kramer",
        applies_to: ["A05"],
        parent_test: "One-way ANOVA",
        model_class: "anova",
        trigger: {
            omnibus_required: true,
            interaction_context: false,
            requires_significant_omnibus: true,
        },
        family_type: "all_pairs",
        contrast_scope: "factor",
        target_term: "group",
        by_factors: [],
        control_level_required: false,
        supports_unbalanced: true,
        supports_heteroscedasticity: false,
        parametric: true,
        repeated_measures: false,
        multiplicity: {
            default: "tukey",
            allowed: ["tukey", "holm", "bonferroni", "mvt"],
        },
        effect_sizes: ["mean_diff", "cohens_d", "hedges_g"],
        output_fields: PROCEDURE_OUTPUT_FIELDS,
        notes:
            "Use only for pairwise mean comparisons in one-factor Gaussian models with a homoscedastic route; Tukey-Kramer handles unequal group sizes.",
    },
    ph_a05_dunnett: {
        id: "ph_a05_dunnett",
        label: "Dunnett",
        applies_to: ["A05"],
        parent_test: "One-way ANOVA",
        model_class: "anova",
        trigger: {
            omnibus_required: true,
            interaction_context: false,
            requires_significant_omnibus: true,
        },
        family_type: "many_to_one",
        contrast_scope: "factor",
        target_term: "group",
        by_factors: [],
        control_level_required: true,
        supports_unbalanced: true,
        supports_heteroscedasticity: false,
        parametric: true,
        repeated_measures: false,
        multiplicity: {
            default: "dunnett",
            allowed: ["dunnett"],
        },
        effect_sizes: ["mean_diff", "cohens_d", "hedges_g"],
        output_fields: PROCEDURE_OUTPUT_FIELDS,
        notes:
            "Use only for treatment-vs-control comparisons after a one-way Gaussian model with one declared control level.",
    },
    ph_a05_games_howell: {
        id: "ph_a05_games_howell",
        label: "Games-Howell",
        applies_to: ["A05"],
        parent_test: "One-way ANOVA",
        model_class: "anova",
        trigger: {
            omnibus_required: true,
            interaction_context: false,
            requires_significant_omnibus: true,
        },
        family_type: "all_pairs",
        contrast_scope: "factor",
        target_term: "group",
        by_factors: [],
        control_level_required: false,
        supports_unbalanced: true,
        supports_heteroscedasticity: true,
        parametric: true,
        repeated_measures: false,
        multiplicity: {
            default: "games-howell",
            allowed: [
                "games-howell",
                "holm",
                "bonferroni",
            ],
        },
        effect_sizes: ["mean_diff", "cohens_d", "hedges_g"],
        output_fields: PROCEDURE_OUTPUT_FIELDS,
        notes:
            "Robust all-pairs alternative for heteroskedastic one-way designs; use instead of Tukey when the heteroskedastic route is chosen.",
    },
    ph_a07_dunn: {
        id: "ph_a07_dunn",
        label: "Dunn",
        applies_to: ["A07"],
        parent_test: "Kruskal-Wallis test",
        model_class: "rank_oneway",
        trigger: {
            omnibus_required: true,
            interaction_context: false,
            requires_significant_omnibus: true,
        },
        family_type: "all_pairs",
        contrast_scope: "factor",
        target_term: "group",
        by_factors: [],
        control_level_required: false,
        supports_unbalanced: true,
        supports_heteroscedasticity: true,
        parametric: false,
        repeated_measures: false,
        multiplicity: {
            default: "holm",
            allowed: ["holm", "bonferroni", "BH", "BY"],
        },
        effect_sizes: ["rank_biserial", "cliffs_delta"],
        output_fields: PROCEDURE_OUTPUT_FIELDS,
        notes:
            "Default rank-based all-pairs follow-up after Kruskal-Wallis with familywise control handled separately from the omnibus test.",
    },
    ph_a08_pairwise_wilcoxon: {
        id: "ph_a08_pairwise_wilcoxon",
        label: "Pairwise Wilcoxon signed-rank",
        applies_to: ["A08"],
        parent_test: "Friedman test",
        model_class: "rank_repeated",
        trigger: {
            omnibus_required: true,
            interaction_context: false,
            requires_significant_omnibus: true,
        },
        family_type: "pairwise_by_factor",
        contrast_scope: "factor",
        target_term: "condition",
        by_factors: [],
        control_level_required: false,
        supports_unbalanced: false,
        supports_heteroscedasticity: true,
        parametric: false,
        repeated_measures: true,
        multiplicity: {
            default: "holm",
            allowed: ["holm", "bonferroni", "BH", "BY"],
        },
        effect_sizes: ["matched_rank_biserial"],
        output_fields: PROCEDURE_OUTPUT_FIELDS,
        notes:
            "Default first-stage repeated rank follow-up after Friedman using matched signed-rank comparisons with Holm correction.",
    },
    ph_a08_friedman_conover: {
        id: "ph_a08_friedman_conover",
        label: "Friedman-Conover",
        applies_to: ["A08"],
        parent_test: "Friedman test",
        model_class: "rank_repeated",
        trigger: {
            omnibus_required: true,
            interaction_context: false,
            requires_significant_omnibus: true,
        },
        family_type: "pairwise_by_factor",
        contrast_scope: "factor",
        target_term: "condition",
        by_factors: [],
        control_level_required: false,
        supports_unbalanced: false,
        supports_heteroscedasticity: true,
        parametric: false,
        repeated_measures: true,
        multiplicity: {
            default: "holm",
            allowed: ["holm", "bonferroni", "BH", "BY"],
        },
        effect_sizes: ["matched_rank_biserial"],
        output_fields: PROCEDURE_OUTPUT_FIELDS,
        ui_enabled: false,
        notes:
            "Prepared extension point for Friedman-specific Conover-style comparisons. Stored now but kept out of the active UI.",
    },
    ph_a08_nemenyi: {
        id: "ph_a08_nemenyi",
        label: "Nemenyi",
        applies_to: ["A08"],
        parent_test: "Friedman test",
        model_class: "rank_repeated",
        trigger: {
            omnibus_required: true,
            interaction_context: false,
            requires_significant_omnibus: true,
        },
        family_type: "pairwise_by_factor",
        contrast_scope: "factor",
        target_term: "condition",
        by_factors: [],
        control_level_required: false,
        supports_unbalanced: false,
        supports_heteroscedasticity: true,
        parametric: false,
        repeated_measures: true,
        multiplicity: {
            default: "nemenyi",
            allowed: ["nemenyi", "holm"],
        },
        effect_sizes: ["matched_rank_biserial"],
        output_fields: PROCEDURE_OUTPUT_FIELDS,
        ui_enabled: false,
        notes:
            "Prepared extension point for Friedman-specific Nemenyi comparisons. Stored now but not exposed in the current UI.",
    },
    ph_d01_pairwise_prop_test: {
        id: "ph_d01_pairwise_prop_test",
        label: "Pairwise proportion tests",
        applies_to: ["D01"],
        parent_test:
            "Chi-square test of independence; Fisher exact test for small 2x2 tables",
        model_class: "contingency_table",
        trigger: {
            omnibus_required: true,
            interaction_context: false,
            requires_significant_omnibus: true,
        },
        family_type: "pairwise_by_factor",
        contrast_scope: "table_margin",
        target_term: "target_factor",
        by_factors: [],
        control_level_required: false,
        supports_unbalanced: true,
        supports_heteroscedasticity: true,
        parametric: false,
        repeated_measures: false,
        multiplicity: {
            default: "holm",
            allowed: ["holm", "bonferroni", "BH", "BY"],
        },
        effect_sizes: ["odds_ratio", "risk_ratio", "cohens_h"],
        output_fields: PROCEDURE_OUTPUT_FIELDS,
        notes:
            "Use for 2×C or C×2 tables when proportion contrasts are the target and asymptotic pairwise proportion tests are acceptable.",
    },
    ph_d01_pairwise_fisher: {
        id: "ph_d01_pairwise_fisher",
        label: "Pairwise Fisher exact tests",
        applies_to: ["D01"],
        parent_test:
            "Chi-square test of independence; Fisher exact test for small 2x2 tables",
        model_class: "contingency_table",
        trigger: {
            omnibus_required: true,
            interaction_context: false,
            requires_significant_omnibus: true,
        },
        family_type: "pairwise_by_factor",
        contrast_scope: "table_margin",
        target_term: "target_factor",
        by_factors: [],
        control_level_required: false,
        supports_unbalanced: true,
        supports_heteroscedasticity: true,
        parametric: false,
        repeated_measures: false,
        multiplicity: {
            default: "holm",
            allowed: ["holm", "bonferroni", "BH", "BY"],
        },
        effect_sizes: ["odds_ratio", "risk_ratio"],
        output_fields: PROCEDURE_OUTPUT_FIELDS,
        notes:
            "Use for small or sparse 2×C or C×2 subtables when an exact pairwise test is preferred.",
    },
    ph_d01_adjusted_residuals: {
        id: "ph_d01_adjusted_residuals",
        label: "Adjusted residual localization",
        applies_to: ["D01"],
        parent_test:
            "Chi-square test of independence; Fisher exact test for small 2x2 tables",
        model_class: "contingency_table",
        trigger: {
            omnibus_required: true,
            interaction_context: false,
            requires_significant_omnibus: true,
        },
        family_type: "custom",
        contrast_scope: "cell",
        target_term: "cell",
        by_factors: [],
        control_level_required: false,
        supports_unbalanced: true,
        supports_heteroscedasticity: true,
        parametric: false,
        repeated_measures: false,
        multiplicity: {
            default: "holm",
            allowed: ["holm", "bonferroni", "BH", "BY"],
        },
        effect_sizes: ["standardized_residual", "cramers_v"],
        output_fields: PROCEDURE_OUTPUT_FIELDS,
        notes:
            "Default localization layer for general R×C contingency tables via adjusted residuals rather than a generic undifferentiated chi-square post hoc switch.",
    },
};

const posthoc_rules = {
    one_way_anova: {
        applies_to: ["A05"],
        model_class: ["anova"],
        show_when: {
            posthoc_available: true,
            iv_levels: "gt2",
        },
        default_procedure_order: [
            {
                when: { control_level_present: true },
                procedure_id: "ph_a05_dunnett",
            },
            {
                when: { heteroskedastic_route: true },
                procedure_id: "ph_a05_games_howell",
            },
            {
                when: { homoscedastic_all_pairs: true },
                procedure_id: "ph_a05_tukey_hsd",
            },
            {
                when: { fallback: true },
                procedure_id: "ph_model_pairwise_emmeans",
            },
        ],
        multiplicity_policy: {
            generic_default: "holm",
            family_matched_defaults: {
                all_pairs: "tukey",
                many_to_one: "dunnett",
            },
            fallback: "holm",
        },
    },
    factorial_and_mixed: {
        applies_to: ["A13", "A14", "A15", "A17", "A18"],
        model_class: [
            "anova_factorial",
            "rm_anova_or_lmm",
            "mixed_anova_or_lmm",
            "ancova_glm",
            "lmm",
        ],
        default_procedure_order: [
            {
                when: { interaction_context: true },
                procedure_id: "ph_model_simple_effects",
            },
            {
                when: { main_effect_context: true },
                procedure_id: "ph_model_pairwise_emmeans",
            },
            {
                when: { control_level_present: true },
                procedure_id: "ph_model_treatment_vs_control",
            },
        ],
        multiplicity_policy: {
            generic_default: "holm",
            optional: ["tukey", "dunnett", "mvt"],
        },
    },
    kruskal_wallis: {
        applies_to: ["A07"],
        model_class: ["rank_oneway"],
        default_procedure_order: [
            { when: { fallback: true }, procedure_id: "ph_a07_dunn" },
        ],
        multiplicity_policy: {
            generic_default: "holm",
            allowed: ["holm", "bonferroni", "BH", "BY"],
        },
    },
    friedman: {
        applies_to: ["A08"],
        model_class: ["rank_repeated"],
        default_procedure_order: [
            {
                when: { fallback: true },
                procedure_id: "ph_a08_pairwise_wilcoxon",
            },
        ],
        multiplicity_policy: {
            generic_default: "holm",
            allowed: ["holm", "bonferroni", "BH", "BY"],
        },
        reserved_extensions: [
            "ph_a08_friedman_conover",
            "ph_a08_nemenyi",
        ],
    },
    contingency_tables: {
        applies_to: ["D01"],
        model_class: ["contingency_table"],
        default_procedure_order: [
            {
                when: { general_r_by_c: true },
                procedure_id: "ph_d01_adjusted_residuals",
            },
            {
                when: { pairwise_margin_test: true },
                procedure_id: "ph_d01_pairwise_prop_test",
            },
            {
                when: { sparse_small_table: true },
                procedure_id: "ph_d01_pairwise_fisher",
            },
        ],
        multiplicity_policy: {
            generic_default: "holm",
            allowed: ["holm", "bonferroni", "BH", "BY"],
        },
    },
};

const default_model_metadata = {
    reference_level: null,
    control_level: null,
    level_order: [],
    ordered_factor: false,
    comparison_subset: null,
    target_factor: null,
    model_class: "none",
    link_family: "identity",
    response_distribution: "gaussian",
    estimate_scale: "difference",
    supports_emmeans: false,
    supports_custom_contrasts: false,
    robust_vcov_supported: false,
    subject_id_required: false,
    cluster_id_required: false,
    within_factors: [],
    between_factors: [],
    long_format_required: false,
    sphericity_relevant: false,
    exact_test_eligible: false,
};

const row_metadata_catalog = {
    A05: {
        target_factor: "group",
        model_class: "anova",
        link_family: "identity",
        response_distribution: "gaussian",
        estimate_scale: "difference",
        supports_emmeans: true,
        supports_custom_contrasts: true,
        robust_vcov_supported: true,
        between_factors: ["group"],
    },
    A06: {
        target_factor: "condition",
        model_class: "rm_anova_or_lmm",
        link_family: "identity",
        response_distribution: "gaussian",
        estimate_scale: "difference",
        supports_emmeans: true,
        supports_custom_contrasts: true,
        robust_vcov_supported: true,
        subject_id_required: true,
        within_factors: ["condition"],
        long_format_required: true,
        sphericity_relevant: true,
    },
    A07: {
        target_factor: "group",
        model_class: "rank_oneway",
        link_family: "rank",
        response_distribution: "continuous_rank",
        estimate_scale: "rank_difference",
        between_factors: ["group"],
    },
    A08: {
        target_factor: "condition",
        model_class: "rank_repeated",
        link_family: "rank",
        response_distribution: "continuous_rank",
        estimate_scale: "paired_rank_difference",
        subject_id_required: true,
        within_factors: ["condition"],
        long_format_required: true,
    },
    A13: {
        target_factor: "focal_factor",
        model_class: "anova_factorial",
        link_family: "identity",
        response_distribution: "gaussian",
        estimate_scale: "difference",
        supports_emmeans: true,
        supports_custom_contrasts: true,
        robust_vcov_supported: true,
        between_factors: ["factor_A", "factor_B"],
    },
    A14: {
        target_factor: "focal_factor",
        model_class: "rm_factorial_or_lmm",
        link_family: "identity",
        response_distribution: "gaussian",
        estimate_scale: "difference",
        supports_emmeans: true,
        supports_custom_contrasts: true,
        robust_vcov_supported: true,
        subject_id_required: true,
        within_factors: ["factor_A", "factor_B"],
        long_format_required: true,
        sphericity_relevant: true,
    },
    A15: {
        target_factor: "focal_factor",
        model_class: "mixed_anova_or_lmm",
        link_family: "identity",
        response_distribution: "gaussian",
        estimate_scale: "difference",
        supports_emmeans: true,
        supports_custom_contrasts: true,
        robust_vcov_supported: true,
        subject_id_required: true,
        within_factors: ["within_factor"],
        between_factors: ["between_factor"],
        long_format_required: true,
    },
    A17: {
        target_factor: "group",
        model_class: "ancova_glm",
        link_family: "identity",
        response_distribution: "gaussian",
        estimate_scale: "difference",
        supports_emmeans: true,
        supports_custom_contrasts: true,
        robust_vcov_supported: true,
        between_factors: ["group"],
    },
    A18: {
        target_factor: "focal_factor",
        model_class: "lmm",
        link_family: "identity",
        response_distribution: "gaussian",
        estimate_scale: "difference",
        supports_emmeans: true,
        supports_custom_contrasts: true,
        robust_vcov_supported: true,
        subject_id_required: true,
        within_factors: ["within_factor"],
        between_factors: ["between_factor"],
        long_format_required: true,
    },
    D01: {
        target_factor: "table_margin",
        model_class: "contingency_table",
        link_family: "count_table",
        response_distribution: "categorical",
        estimate_scale: "table_localization",
        exact_test_eligible: true,
    },
    D04: {
        target_factor: "group",
        model_class: "glm_binomial",
        link_family: "logit",
        response_distribution: "binomial",
        estimate_scale: "odds_ratio",
        supports_emmeans: true,
        supports_custom_contrasts: true,
        robust_vcov_supported: true,
        between_factors: ["group"],
    },
    D05: {
        target_factor: "group",
        model_class: "glm_count",
        link_family: "log",
        response_distribution: "poisson_or_negative_binomial",
        estimate_scale: "rate_ratio",
        supports_emmeans: true,
        supports_custom_contrasts: true,
        robust_vcov_supported: true,
        between_factors: ["group"],
    },
    D06: {
        target_factor: "group",
        model_class: "ordinal_regression",
        link_family: "logit",
        response_distribution: "ordinal",
        estimate_scale: "odds_ratio",
        supports_emmeans: true,
        supports_custom_contrasts: true,
        robust_vcov_supported: true,
        between_factors: ["group"],
        ordered_factor: true,
    },
    D07: {
        target_factor: "group",
        model_class: "multinomial_logit",
        link_family: "logit",
        response_distribution: "multinomial",
        estimate_scale: "relative_risk_ratio",
        supports_emmeans: true,
        supports_custom_contrasts: true,
        robust_vcov_supported: true,
        between_factors: ["group"],
    },
    D08: {
        target_factor: "group",
        model_class: "correlated_logistic",
        link_family: "logit",
        response_distribution: "binomial",
        estimate_scale: "odds_ratio",
        supports_emmeans: true,
        supports_custom_contrasts: true,
        robust_vcov_supported: true,
        subject_id_required: true,
        cluster_id_required: true,
        between_factors: ["group"],
        long_format_required: true,
    },
    D09: {
        target_factor: "group",
        model_class: "correlated_count",
        link_family: "log",
        response_distribution: "count",
        estimate_scale: "rate_ratio",
        supports_emmeans: true,
        supports_custom_contrasts: true,
        robust_vcov_supported: true,
        subject_id_required: true,
        cluster_id_required: true,
        between_factors: ["group"],
        long_format_required: true,
    },
};

function cloneData(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function uniqueNonEmpty(values) {
    return Array.from(
        new Set(
            (values || []).filter(
                (value) =>
                    value !== undefined &&
                    value !== null &&
                    String(value).trim() !== "",
            ),
        ),
    );
}

function isRepeatedDesignRow(row) {
    return ["within", "both"].includes(norm(row.design));
}

function deriveTargetFactor(row) {
    if (norm(row.target_factor)) return row.target_factor;
    const allFactors = [
        ...(row.within_factors || []),
        ...(row.between_factors || []),
    ].filter(Boolean);
    return allFactors[0] || "group";
}

function deriveByFactors(row, procedure) {
    const allFactors = uniqueNonEmpty([
        ...(row.within_factors || []),
        ...(row.between_factors || []),
    ]);
    const targetTerm = deriveTargetFactor(row);
    if (
        procedure.family_type === "simple_effects" ||
        procedure.id === "ph_model_interaction_slices"
    ) {
        return allFactors.filter((factor) => factor !== targetTerm);
    }
    if (procedure.family_type === "pairwise_by_factor") {
        return allFactors.filter((factor) => factor !== targetTerm);
    }
    return uniqueNonEmpty(procedure.by_factors || []);
}

function deriveProcedureEffectSizes(row, procedure) {
    if (procedure.id === "ph_a07_dunn") {
        return ["rank_biserial", "cliffs_delta"];
    }
    if (
        procedure.id === "ph_a08_pairwise_wilcoxon" ||
        procedure.id === "ph_a08_friedman_conover" ||
        procedure.id === "ph_a08_nemenyi"
    ) {
        return ["matched_rank_biserial"];
    }
    if (
        procedure.id === "ph_d01_pairwise_prop_test" ||
        procedure.id === "ph_d01_pairwise_fisher"
    ) {
        return ["odds_ratio", "risk_ratio", "cohens_h"];
    }
    if (procedure.id === "ph_d01_adjusted_residuals") {
        return ["standardized_residual", "cramers_v"];
    }
    if (row.estimate_scale === "difference") {
        return ["mean_diff", "cohens_d", "hedges_g"];
    }
    if (row.estimate_scale === "odds_ratio") {
        return ["odds_ratio"];
    }
    if (row.estimate_scale === "rate_ratio") {
        return ["rate_ratio"];
    }
    if (row.estimate_scale === "relative_risk_ratio") {
        return ["relative_risk_ratio"];
    }
    if (row.estimate_scale === "rank_difference") {
        return ["rank_biserial", "cliffs_delta"];
    }
    if (row.estimate_scale === "paired_rank_difference") {
        return ["matched_rank_biserial"];
    }
    return uniqueNonEmpty(procedure.effect_sizes || ["estimate"]);
}

function instantiateProcedure(row, procedureId, overrides = {}) {
    const base = cloneData(posthoc_catalog[procedureId]);
    if (!base) return null;
    const procedure = Object.assign(base, cloneData(overrides));
    procedure.applies_to = [row.id];
    procedure.parent_test = row.recommended_test;
    procedure.model_class = row.model_class;
    procedure.target_term =
        overrides.target_term || row.target_factor || base.target_term;
    procedure.by_factors = uniqueNonEmpty(
        overrides.by_factors || deriveByFactors(row, procedure),
    );
    procedure.repeated_measures =
        overrides.repeated_measures !== undefined
            ? overrides.repeated_measures
            : isRepeatedDesignRow(row);
    procedure.parametric =
        overrides.parametric !== undefined
            ? overrides.parametric
            : ![
                  "rank_oneway",
                  "rank_repeated",
                  "contingency_table",
              ].includes(row.model_class);
    procedure.effect_sizes = uniqueNonEmpty(
        overrides.effect_sizes ||
            deriveProcedureEffectSizes(row, procedure),
    );
    procedure.output_fields = uniqueNonEmpty(
        overrides.output_fields ||
            procedure.output_fields ||
            posthoc_output_schema.default_fields_sequence,
    );
    procedure.estimate_scale =
        overrides.estimate_scale || row.estimate_scale || "difference";
    if (!procedure.multiplicity) {
        procedure.multiplicity = {
            default: "holm",
            allowed: ["holm"],
        };
    }
    return procedure;
}

function buildUnavailablePosthoc() {
    return {
        available: false,
        family_scope: "",
        default_strategy:
            "No structured post-hoc module is attached to this primary test.",
        procedures: [],
    };
}

function buildRowPosthoc(row) {
    switch (row.id) {
        case "A05":
            return {
                available: true,
                family_scope:
                    "Separate all-pairs and many-to-one families within the one-way grouping factor.",
                default_strategy:
                    "Use Tukey/Tukey-Kramer for homoscedastic all-pairs contrasts, Games-Howell for heteroskedastic all-pairs contrasts, and Dunnett when a control level is declared. A model-based EMM layer remains available as a general fallback.",
                procedures: [
                    instantiateProcedure(row, "ph_a05_tukey_hsd"),
                    instantiateProcedure(row, "ph_a05_games_howell"),
                    instantiateProcedure(row, "ph_a05_dunnett"),
                    instantiateProcedure(
                        row,
                        "ph_model_pairwise_emmeans",
                        {
                            notes:
                                "Model-based fallback for one-way Gaussian contrasts when a general emmeans-style contrast engine is preferred.",
                        },
                    ),
                    instantiateProcedure(row, "ph_model_treatment_vs_control"),
                    instantiateProcedure(row, "ph_model_custom_contrasts"),
                ].filter(Boolean),
            };
        case "A06":
            return {
                available: true,
                family_scope:
                    "Within-subject contrast families are separated by conditioning factors or repeated-measures slices.",
                default_strategy:
                    "Use model-based within-subject contrasts on the fitted repeated-measures ANOVA or mixed model. Switch to simple effects or interaction slices when the substantive target is an interaction.",
                procedures: [
                    instantiateProcedure(row, "ph_model_pairwise_emmeans"),
                    instantiateProcedure(row, "ph_model_simple_effects"),
                    instantiateProcedure(row, "ph_model_interaction_slices"),
                    instantiateProcedure(row, "ph_model_treatment_vs_control"),
                    instantiateProcedure(row, "ph_model_custom_contrasts"),
                ].filter(Boolean),
            };
        case "A07":
            return {
                available: true,
                family_scope:
                    "All-pairs rank-based follow-up family within the one-way grouping factor.",
                default_strategy:
                    "Use Dunn as the default nonparametric post-hoc procedure after Kruskal-Wallis, with Holm as the default multiplicity correction.",
                procedures: [
                    instantiateProcedure(row, "ph_a07_dunn"),
                ],
            };
        case "A08":
            return {
                available: true,
                family_scope:
                    "Pairwise repeated rank contrasts within the condition factor, separated from the omnibus Friedman family.",
                default_strategy:
                    "Use pairwise Wilcoxon signed-rank follow-ups with Holm correction as the first active stage. Conover and Nemenyi are stored as extension points.",
                procedures: [
                    instantiateProcedure(row, "ph_a08_pairwise_wilcoxon"),
                    instantiateProcedure(row, "ph_a08_friedman_conover"),
                    instantiateProcedure(row, "ph_a08_nemenyi"),
                ].filter(Boolean),
            };
        case "A13":
        case "A14":
        case "A15":
        case "A17":
        case "A18":
        case "D04":
        case "D05":
        case "D06":
        case "D07":
        case "D08":
        case "D09":
            return {
                available: true,
                family_scope:
                    "Model-based contrast families are split by target term and by-factors, with separate multiplicity handling for each family.",
                default_strategy:
                    "Use model-based estimated marginal means or equivalent marginal contrasts for main effects. Use simple effects or interaction slices when probing interactions. Treatment-vs-control and custom contrasts are separate families.",
                procedures: [
                    instantiateProcedure(row, "ph_model_pairwise_emmeans"),
                    instantiateProcedure(row, "ph_model_simple_effects"),
                    instantiateProcedure(row, "ph_model_interaction_slices"),
                    instantiateProcedure(row, "ph_model_treatment_vs_control"),
                    instantiateProcedure(row, "ph_model_custom_contrasts"),
                ].filter(Boolean),
            };
        case "D01":
            return {
                available: true,
                family_scope:
                    "Separate localization families for pairwise margin tests versus residual-based cell diagnostics.",
                default_strategy:
                    "For 2×C or C×2 tables use pairwise proportion or Fisher tests as needed; for general R×C tables use adjusted residual localization. Holm is the generic multiplicity default.",
                procedures: [
                    instantiateProcedure(row, "ph_d01_adjusted_residuals"),
                    instantiateProcedure(row, "ph_d01_pairwise_prop_test"),
                    instantiateProcedure(row, "ph_d01_pairwise_fisher"),
                ].filter(Boolean),
            };
        default:
            return buildUnavailablePosthoc();
    }
}

function attachStructuredMetadata(targetRows) {
    targetRows.forEach((row, index) => {
        const mergedMeta = Object.assign(
            cloneData(default_model_metadata),
            cloneData(row_metadata_catalog[row.id] || {}),
        );
        Object.assign(row, mergedMeta);
        row.internal_key = row.id + "__" + String(index);
        row.target_factor = deriveTargetFactor(row);
        row.posthoc = buildRowPosthoc(row);
        row.posthoc_output_schema = posthoc_output_schema;
    });
}

attachStructuredMetadata(rows);

const stageDefs = [
    {
        key: "dv_count",
        label: "How many DV\nin hypothesis?",
        question:
            "How many dependent variables are in the hypothesis?",
    },
    {
        key: "dv_kind",
        label: "Which kind\nof DV?",
        question: "Which kind is the dependent variable?",
    },
    {
        key: "iv_count",
        label: "How many IV\nin hypothesis?",
        question: "How many independent variables do you have?",
    },
    {
        key: "iv_kind",
        label: "Which kind\nof IV?",
        question: "Which kind are the independent variables?",
    },
    {
        key: "iv_levels",
        label: "If discrete IV,\nhow many levels?",
        question:
            "If discrete IVs are involved, how many levels does an IV have?",
    },
    {
        key: "design",
        label: "Within oder\nBetween IV?",
        question: "Is/Are the IV within, between, or both?",
    },
    {
        key: "dv_parametric",
        label: "Parametric\ndata?",
        question: "Is the data of the DV parametric?",
    },
    {
        key: "dv_subtype",
        label: "DV subtype",
        question: "Which subtype is the discrete DV?",
    },
    {
        key: "result",
        label: "Statistical Test\n/ Model",
        question: "",
    },
];
const answers = {};
const overviewSvg = document.getElementById("overviewSvg");
const overviewWrap = overviewSvg ? overviewSvg.closest(".overview-wrap") : null;
const answersEl = document.getElementById("answers");
const questionArea = document.getElementById("questionArea");
const resultArea = document.getElementById("resultArea");
const shareableStageKeys = stageDefs
    .filter((stage) => stage.key !== "result")
    .map((stage) => stage.key)
    .concat(["route"]);

function norm(v) {
    return v === undefined || v === null ? "" : String(v).trim();
}
function pretty(v) {
    const map = {
        1: "1",
        ge2: "≥ 2",
        gt2: "≥ 2",
        "2_or_gt2": "≥ 2",
        "2_or_gt2_plus_cont": "≥ 2",
        continuous: "Continuous",
        discrete: "Discrete",
        both: "Both",
        between: "Between",
        within: "Within",
        yes: "yes",
        no: "no",
        any: "any",
        binary: "Binary",
        count: "Count",
        ordinal: "Ordinal",
        nominal: "Nominal",
    };
    return map[v] || v;
}
function formatStats(text) {
    return String(text || "")
        .replace(/adj\. R\^2/g, "adj. R²")
        .replace(/R\^2/g, "R²")
        .replace(/f\^2/g, "f²")
        .replace(/eta\^2/g, "η²")
        .replace(/partial eta\^2/g, "partial η²")
        .replace(/generalized eta\^2/g, "generalized η²")
        .replace(/omega\^2/g, "ω²")
        .replace(/epsilon\^2/g, "ε²")
        .replace(/pseudo-R\^2/g, "pseudo-R²");
}
function escapeHtml(s) {
    return String(s).replace(
        /[&<>"']/g,
        (m) =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
            })[m],
    );
}

function escapeCodeHtml(s) {
    return String(s).replace(
        /[&<>]/g,
        (m) =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
            })[m],
    );
}

/* Keep code examples readable without introducing a heavy client-side highlighter dependency. */
function renderCodeMarkup(code, language) {
    const placeholderPrefix = "__CODE_TOKEN__";
    const placeholders = [];
    const storeToken = (markup) => {
        const token = `${placeholderPrefix}${placeholders.length}__`;
        placeholders.push(markup);
        return token;
    };
    const restoreTokens = (value) =>
        placeholders.reduce(
            (output, markup, index) =>
                output.replace(`${placeholderPrefix}${index}__`, markup),
            value,
        );

    let highlighted = String(code || "# not available");

    highlighted = highlighted.replace(
        /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g,
        (match) => storeToken(`<span class="code-token-string">${escapeCodeHtml(match)}</span>`),
    );
    highlighted = highlighted.replace(
        /(^|\n)(\s*#.*?$)/gm,
        (match, lineBreak, comment) =>
            `${lineBreak}${storeToken(`<span class="code-token-comment">${escapeCodeHtml(comment)}</span>`)}`,
    );
    highlighted = escapeCodeHtml(highlighted);
    highlighted = highlighted.replace(
        /\b\d+(?:\.\d+)?\b/g,
        '<span class="code-token-number">$&</span>',
    );

    const keywordMap = {
        python:
            /\b(import|from|as|if|elif|else|for|while|return|def|class|with|in|and|or|not|True|False|None|lambda|try|except|finally|print)\b/g,
        r:
            /\b(function|if|else|for|while|repeat|return|library|data|TRUE|FALSE|NULL|NA)\b/g,
        generic: /\b(function|return|const|let|var|if|else|for|while|class|new)\b/g,
    };
    const keywordPattern = keywordMap[language] || keywordMap.generic;
    highlighted = highlighted.replace(
        keywordPattern,
        '<span class="code-token-keyword">$&</span>',
    );
    highlighted = highlighted.replace(
        /\b([A-Za-z_][A-Za-z0-9._]*)\s*(?=\()/g,
        '<span class="code-token-function">$1</span>',
    );

    return restoreTokens(highlighted);
}

function detectCodeLanguage(title) {
    const normalizedTitle = String(title || "").toLowerCase();

    if (normalizedTitle.includes("python")) {
        return "python";
    }

    if (/\br\b/.test(normalizedTitle)) {
        return "r";
    }

    return "generic";
}
function parseEffectItems(row) {
    const label = formatStats(
        norm(row.effect_sizes) ||
        effectProfile(row.recommended_test).label ||
        "",
    );
    return label
        .split(/[,;]+/)
        .map((s) => s.trim())
        .filter(Boolean);
}
function matchingRows(ans) {
    return rows.filter((r) =>
        Object.entries(ans).every(
            ([k, v]) => norm(r[k]) === norm(v),
        ),
    );
}

function shouldSkipIvLevelsStage(signatureValues = {}) {
    const signature = [
        norm(signatureValues.dv_count),
        norm(signatureValues.dv_kind),
        norm(signatureValues.iv_count),
        norm(signatureValues.iv_kind),
    ].join("|");

    const skippedBranches = new Set([
        "1|continuous|ge2|discrete",
        "1|continuous|ge2|both",
        "ge2|continuous|1|discrete",
        "ge2|continuous|ge2|discrete",
        "ge2|continuous|ge2|both",
    ]);

    return skippedBranches.has(signature);
}

function shouldAutoResolveIvLevels(ans, values) {
    if (values.length !== 1 || values[0] === "") {
        return false;
    }

    return shouldSkipIvLevelsStage(ans);
}

function currentStageKey() {
    const match = matchingRows(answers);
    if (match.length === 1) {
        for (const s of stageDefs) {
            if (s.key === "result") continue;
            if (answers[s.key] !== undefined) continue;
            if (norm(match[0][s.key]) === "") continue;
            if (
                s.key === "iv_levels" &&
                shouldAutoResolveIvLevels(answers, [norm(match[0][s.key])])
            ) {
                continue;
            }
            return s.key;
        }
        return null;
    }
    for (const s of stageDefs) {
        if (s.key === "result" || answers[s.key] !== undefined)
            continue;
        const vals = Array.from(
            new Set(
                match.map((r) => norm(r[s.key])).filter(Boolean),
            ),
        );
        if (
            s.key === "iv_levels" &&
            shouldAutoResolveIvLevels(answers, vals)
        ) {
            continue;
        }
        if (vals.length) return s.key;
    }
    return null;
}

function currentVisualStageKey() {
    const key = currentStageKey();

    if (key) {
        return key;
    }

    const match = matchingRows(answers);
    if (match.length === 1 || routeChooserConfig(match)) {
        return "result";
    }

    return null;
}

function optionsForStage(stageKey) {
    return Array.from(
        new Set(
            matchingRows(answers)
                .map((r) => norm(r[stageKey]))
                .filter(Boolean),
        ),
    ).sort((a, b) => a.localeCompare(b));
}
function clearFrom(stageKey) {
    const idx = stageDefs.findIndex((s) => s.key === stageKey);
    for (let i = idx; i < stageDefs.length; i += 1)
        delete answers[stageDefs[i].key];
    delete answers.route;
    selectedResult = null;
}

function buildAnswerStateFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const urlAnswers = {};

    for (const stageKey of shareableStageKeys) {
        const value = norm(params.get(stageKey));
        if (!value) {
            continue;
        }
        urlAnswers[stageKey] = value;
    }

    return urlAnswers;
}

function applyAnswerState(nextAnswers = {}) {
    for (const key of Object.keys(answers)) {
        delete answers[key];
    }

    for (const stage of stageDefs) {
        if (stage.key === "result") {
            continue;
        }

        const value = norm(nextAnswers[stage.key]);
        if (!value) {
            continue;
        }

        const possibleValues = optionsForStage(stage.key);
        if (!possibleValues.includes(value)) {
            break;
        }

        answers[stage.key] = value;
    }

    const routeValue = norm(nextAnswers.route);
    if (routeValue) {
        const routeChoices = matchingRows(answers)
            .map((row) => norm(row.route))
            .filter(Boolean);
        if (routeChoices.includes(routeValue)) {
            answers.route = routeValue;
        }
    }
}

function syncUrlToAnswers() {
    const url = new URL(window.location.href);
    const nextParams = new URLSearchParams(url.search);

    shareableStageKeys.forEach((stageKey) => {
        nextParams.delete(stageKey);
        const value = norm(answers[stageKey]);
        if (value) {
            nextParams.set(stageKey, value);
        }
    });

    const nextSearch = nextParams.toString();
    const nextUrl =
        url.pathname +
        (nextSearch ? `?${nextSearch}` : "") +
        url.hash;

    window.history.replaceState({}, "", nextUrl);
}

function pathForRow(row) {
    const out = [];
    for (const s of stageDefs) {
        if (s.key === "result") {
            out.push({
                stage: "result",
                value: row.recommended_test,
            });
            continue;
        }

        const v = norm(row[s.key]);
        if (
            s.key === "iv_levels" &&
            shouldSkipIvLevelsStage(row)
        ) {
            continue;
        }
        if (v) out.push({ stage: s.key, value: v });
    }
    return out;
}

const tree = (() => {
    const root = {
        id: "root",
        stage: "root",
        value: "",
        kind: "root",
        depth: -1,
        children: [],
        parent: null,
        rowIds: new Set(),
    };
    for (const row of rows) {
        let parent = root;
        parent.rowIds.add(row.id);
        for (const step of pathForRow(row)) {
            const kind =
                step.stage === "result" ? "result" : "option";
            let node = parent.children.find(
                (n) =>
                    n.stage === step.stage &&
                    n.value === step.value &&
                    n.kind === kind,
            );
            if (!node) {
                node = {
                    id:
                        parent.id +
                        "|" +
                        step.stage +
                        "|" +
                        step.value +
                        "|" +
                        kind,
                    stage: step.stage,
                    value: step.value,
                    kind,
                    children: [],
                    parent,
                    rowIds: new Set(),
                    depth: parent.depth + 1,
                    label:
                        step.stage === "result"
                            ? step.value
                            : pretty(step.value),
                };
                parent.children.push(node);
            }
            node.rowIds.add(row.id);
            parent = node;
            parent.rowIds.add(row.id);
        }
    }
    return root;
})();
const layout = {
    nodes: [],
    edges: [],
    stageCenters: new Map(),
    maxX: 0,
    maxY: 0,
};
let pendingTreeViewportScroll = true;

function isCompactViewport() {
    return window.matchMedia("(max-width: 767.98px)").matches;
}

function scrollTreeToActiveStage() {
    if (!overviewWrap || !isCompactViewport()) {
        pendingTreeViewportScroll = false;
        return;
    }

    const currentKey = currentVisualStageKey();
    const stageCenter = currentKey ? layout.stageCenters.get(currentKey) : null;

    if (stageCenter === undefined || stageCenter === null) {
        pendingTreeViewportScroll = false;
        return;
    }

    const targetLeft = Math.max(
        0,
        stageCenter - overviewWrap.clientWidth / 2,
    );
    overviewWrap.scrollTo({
        left: targetLeft,
        behavior: "smooth",
    });
    pendingTreeViewportScroll = false;
}

function assignY(node, ref) {
    if (!node.children.length) {
        node.y = ref.value;
        ref.value += 34;
        return node.y;
    }
    const ys = node.children.map((c) => assignY(c, ref));
    node.y = (ys[0] + ys[ys.length - 1]) / 2;
    return node.y;
}
function assignX(node) {
    if (node.kind === "root") node.x = 0;
    else {
        const idx = stageDefs.findIndex(
            (s) => s.key === node.stage,
        );
        node.x =
            70 + idx * 150 + (node.stage === "result" ? 90 : 0);
    }
    node.children.forEach(assignX);
}
function collect(node) {
    if (node.kind !== "root") layout.nodes.push(node);
    for (const child of node.children) {
        if (node.kind !== "root")
            layout.edges.push({ from: node, to: child });
        collect(child);
    }
}
assignY(tree, { value: 52 });
assignX(tree);
collect(tree);
for (const n of layout.nodes) {
    layout.maxX = Math.max(layout.maxX, n.x);
    layout.maxY = Math.max(layout.maxY, n.y);
}
for (const s of stageDefs) {
    const idx = stageDefs.findIndex((d) => d.key === s.key);
    layout.stageCenters.set(
        s.key,
        70 + idx * 150 + (s.key === "result" ? 90 : 0),
    );
}
function nodeState(node) {
    const match = matchingRows(answers);
    const compatible = match.some((r) =>
        node.rowIds.has(r.id),
    );
    const nextKey = currentStageKey();
    const routeChoicePending =
        node.kind === "result" &&
        !nextKey &&
        compatible &&
        Boolean(routeChooserConfig(match));
    const resultResolved =
        node.kind === "result" &&
        match.length === 1 &&
        !nextKey &&
        compatible;
    const nextOption =
        node.kind === "result"
            ? resultResolved || routeChoicePending
            : node.stage === nextKey && compatible;
    const selected =
        (node.kind !== "result" &&
            answers[node.stage] !== undefined &&
            norm(answers[node.stage]) === norm(node.value) &&
            compatible) ||
        resultResolved;
    const clickable = node.kind !== "root";
    const answeredStages = stageDefs
        .filter(
            (s) =>
                s.key !== "result" && answers[s.key] !== undefined,
        )
        .map((s) => s.key);
    const lastAnsweredStage = answeredStages.length
        ? answeredStages[answeredStages.length - 1]
        : null;
    const current =
        compatible &&
        ((node.kind === "result" && (resultResolved || routeChoicePending)) ||
            (node.kind !== "result" &&
                node.stage === lastAnsweredStage &&
                answers[node.stage] !== undefined &&
                norm(answers[node.stage]) === norm(node.value)));
    return {
        compatible,
        selected,
        nextOption,
        clickable,
        resultResolved,
        routeChoicePending,
        current,
    };
}
function edgeState(edge) {
    const a = nodeState(edge.from),
        b = nodeState(edge.to);
    const selectedPath =
        (a.selected || a.current) &&
        (b.selected || b.current);
    const optionPath =
        (a.selected || a.current) &&
        (b.nextOption || b.current);

    return {
        compatible: a.compatible && b.compatible,
        selectedPath,
        optionPath,
    };
}

function routeValueForResultNode(node) {
    const routeChoices = matchingRows(answers)
        .filter((row) => node.rowIds.has(row.id))
        .map((row) => norm(row.route))
        .filter(Boolean);
    const uniqueRoutes = Array.from(new Set(routeChoices));

    return uniqueRoutes.length === 1 ? uniqueRoutes[0] : "";
}

function nodeSteps(node) {
    const steps = [];
    let currentNode = node;

    while (currentNode && currentNode.kind !== "root") {
        steps.push({
            stage: currentNode.stage,
            value: currentNode.value,
            kind: currentNode.kind,
        });
        currentNode = currentNode.parent;
    }

    return steps.reverse();
}

function applyNodeSelection(node) {
    const steps = nodeSteps(node);

    for (const key of Object.keys(answers)) {
        delete answers[key];
    }

    for (const step of steps) {
        if (step.stage === "result") {
            continue;
        }
        answers[step.stage] = step.value;
    }

    delete answers.route;

    if (node.kind === "result") {
        const routeValue = routeValueForResultNode(node);
        if (routeValue) {
            answers.route = routeValue;
        }
    }
}

function handleNodeClick(node) {
    if (node.kind === "root") {
        return;
    }

    applyNodeSelection(node);
    selectedResult = null;
    pendingResultScroll = node.kind === "result";
    pendingAssumptionScroll = currentStageKey() === "dv_parametric";
    pendingTreeViewportScroll = true;
    render();

    if (node.kind === "result") {
        scrollToSection("resultArea");
    }
}
function drawTree() {
    const width = Math.max(1280, layout.maxX + 140);
    const height = Math.max(500, layout.maxY + 48);
    overviewSvg.setAttribute(
        "viewBox",
        "0 0 " + width + " " + height,
    );
    overviewSvg.innerHTML = "";
    const ns = "http://www.w3.org/2000/svg";
    const currentKey = currentVisualStageKey();
    if (currentKey) {
        const idx = stageDefs.findIndex(
            (s) => s.key === currentKey,
        );
        if (idx >= 0) {
            const bg = document.createElementNS(ns, "rect");
            bg.setAttribute("class", "stage-highlight");
            bg.setAttribute("rx", "16");
            bg.setAttribute("ry", "16");
            const isResultStage = currentKey === "result";
            bg.setAttribute(
                "x",
                String(
                    layout.stageCenters.get(currentKey) -
                    (isResultStage ? 150 : 70),
                ),
            );
            bg.setAttribute("y", "0");
            bg.setAttribute(
                "width",
                String(isResultStage ? 300 : 140),
            );
            bg.setAttribute("height", String(height - 4));
            overviewSvg.appendChild(bg);
        }
    }
    for (const s of stageDefs) {
        const tx = layout.stageCenters.get(s.key);
        const t = document.createElementNS(ns, "text");
        t.setAttribute("x", tx);
        t.setAttribute("y", 18);
        t.setAttribute("class", "stage-header");
        const lines = String(s.label).split("\n");
        lines.forEach((line, idx) => {
            const span = document.createElementNS(ns, "tspan");
            span.setAttribute("x", tx);
            span.setAttribute("dy", idx === 0 ? "0" : "12");
            span.textContent = line;
            t.appendChild(span);
        });
        overviewSvg.appendChild(t);
    }
    for (const edge of layout.edges) {
        const st = edgeState(edge);
        const p = document.createElementNS(ns, "path");
        p.setAttribute("class", "edge");
        const x1 =
            edge.from.x + (edge.from.kind === "result" ? 136 : 50);
        const y1 = edge.from.y;
        const x2 =
            edge.to.x - (edge.to.kind === "result" ? 116 : 50);
        const y2 = edge.to.y;
        const mx = (x1 + x2) / 2;
        p.setAttribute(
            "d",
            "M " +
            x1 +
            " " +
            y1 +
            " C " +
            mx +
            " " +
            y1 +
            ", " +
            mx +
            " " +
            y2 +
            ", " +
            x2 +
            " " +
            y2,
        );
        p.setAttribute(
            "stroke",
            st.selectedPath
                ? "var(--selected-border)"
                : st.compatible
                    ? "#c6d3e0"
                    : "#434c59",
        );
        p.setAttribute(
            "opacity",
            st.selectedPath ? "1" : st.compatible ? "0.95" : "0.35",
        );
        p.setAttribute(
            "stroke-width",
            st.selectedPath ? "2.8" : "2.2",
        );
        overviewSvg.appendChild(p);
    }
    for (const node of layout.nodes) {
        const st = nodeState(node);
        const g = document.createElementNS(ns, "g");
        g.setAttribute(
            "class",
            "node" + (st.clickable ? " clickable" : ""),
        );
        const isResult = node.kind === "result";
        const w = isResult ? 240 : 100;
        const h = 26;
        const rect = document.createElementNS(ns, "rect");
        rect.setAttribute("x", node.x - w / 2);
        rect.setAttribute("y", node.y - h / 2);
        rect.setAttribute("width", w);
        rect.setAttribute("height", h);
        rect.setAttribute("rx", "12");
        rect.setAttribute("ry", "12");
        rect.setAttribute("class", "node-rect");

        let baseFill = "var(--inactive)";
        let baseStroke = "var(--inactive-border)";
        let hoverFill = "var(--inactive)";
        let hoverStroke = "var(--inactive-border)";

        if (st.current) {
            baseFill = "var(--current)";
            baseStroke = "var(--current-border)";
            hoverFill = "#6fcb7d";
            hoverStroke = "#6fcb7d";
        } else if (st.selected) {
            baseFill = "var(--selected)";
            baseStroke = "var(--selected-border)";
            hoverFill = "#68c679";
            hoverStroke = "#68c679";
        } else if (st.nextOption) {
            baseFill = "var(--clickable)";
            baseStroke = "var(--clickable-border)";
            hoverFill = "#ff9440";
            hoverStroke = "#ff9440";
        } else if (st.compatible) {
            baseFill = "var(--active)";
            baseStroke = "var(--active-border)";
            hoverFill = "var(--active)";
            hoverStroke = "var(--active-border)";
        }

        rect.setAttribute("fill", baseFill);
        rect.setAttribute("stroke", baseStroke);

        if (st.clickable) {
            g.addEventListener("mouseenter", () => {
                rect.setAttribute("fill", hoverFill);
                rect.setAttribute("stroke", hoverStroke);
                rect.style.filter = "brightness(0.97) saturate(1.08)";
            });
            g.addEventListener("mouseleave", () => {
                rect.setAttribute("fill", baseFill);
                rect.setAttribute("stroke", baseStroke);
                rect.style.filter = "";
            });
        }

        const label = document.createElementNS(ns, "text");
        label.setAttribute("x", node.x);
        label.setAttribute("y", node.y + 1);
        label.setAttribute(
            "class",
            "node-label" +
            (isResult ? " result" : "") +
            ((st.nextOption || st.current || st.selected) ? " clickable-label" : "") +
            (st.compatible || st.selected ? "" : " dark"),
        );
        const displayNodeLabel = formatStats(node.label);
        const txt =
            displayNodeLabel.length > (isResult ? 30 : 17)
                ? displayNodeLabel.slice(0, isResult ? 29 : 16) +
                "…"
                : displayNodeLabel;
        label.textContent = txt;
        if (st.clickable)
            g.addEventListener("click", () =>
                handleNodeClick(node),
            );
        g.appendChild(rect);
        g.appendChild(label);
        overviewSvg.appendChild(g);
    }
}
function renderAnswers() {
    answersEl.innerHTML = "";
    const active = Object.entries(answers).filter(([key]) =>
        stageDefs.some((stage) => stage.key === key),
    );
    if (!active.length) {
        return;
    }

    const heading = document.createElement("div");
    heading.className = "hint";
    heading.textContent = "Answered so far";
    answersEl.appendChild(heading);

    for (const [key, value] of active) {
        const def = stageDefs.find((s) => s.key === key);
        const chip = document.createElement("span");
        chip.className = "answer-chip";
        const label = document.createElement("span");
        label.className = "answer-chip-label";
        label.innerHTML =
            "<strong>" +
            escapeHtml(formatStats(def.label)) +
            ":</strong> " +
            escapeHtml(formatStats(pretty(value)));
        chip.appendChild(label);

        const clearButton = document.createElement("button");
        clearButton.type = "button";
        clearButton.title = "Clear from here";
        clearButton.setAttribute("aria-label", "Clear from here");
        clearButton.textContent = "×";
        chip.appendChild(clearButton);
        clearButton.addEventListener(
            "click",
            () => {
                clearFrom(key);
                selectedResult = null;
                pendingResultScroll = false;
                pendingAssumptionScroll = false;
                pendingTreeViewportScroll = true;
                render();
            },
        );
        answersEl.appendChild(chip);
    }
}
function scrollToSection(target, behavior = "smooth") {
    const el = document.getElementById(target);
    if (!el) return;
    el.scrollIntoView({ behavior, block: "start" });
}

function renderQuestion() {
    const key = currentStageKey();
    if (!key) {
        const match = matchingRows(answers);
        if (routeChooserConfig(match)) {
            questionArea.innerHTML =
                '<p class="small">The tree path is complete. Choose the matching analysis target in the result panel below.</p>';
            return;
        }
        questionArea.innerHTML =
            '<p class="small">All required questions for the current route are answered.</p>';
        return;
    }
    const def = stageDefs.find((s) => s.key === key);
    const opts = optionsForStage(key);
    let html =
        '<div class="question-text">' +
        escapeHtml(formatStats(def.question)) +
        '</div><div class="options">';
    for (const opt of opts) {
        html +=
            '<button class="option-btn" data-value="' +
            escapeHtml(opt) +
            '">' +
            escapeHtml(formatStats(pretty(opt))) +
            "</button>";
    }
    html +=
        '</div><div class="hint">Only options that still match at least one valid path are shown.</div>';
    questionArea.innerHTML = html;

    questionArea.querySelectorAll(".option-btn").forEach((btn) =>
        btn.addEventListener("click", () => {
            clearFrom(key);
            answers[key] = btn.getAttribute("data-value");
            selectedResult = null;
            pendingResultScroll = false;
            pendingAssumptionScroll = currentStageKey() === "dv_parametric";
            pendingTreeViewportScroll = true;
            render();
        }),
    );
}

function matchingRowsIgnoring(stageKey) {
    return rows.filter((r) =>
        Object.entries(answers).every(([k, v]) => {
            if (k === stageKey) return true;
            return norm(r[k]) === norm(v);
        }),
    );
}

const parametricGuidance = {
    independent_two_groups: {
        title: "Check whether the continuous outcome is approximately parametric for a two-group independent design",
        lead:
            "More than one compatible route remains. Answer the next question to resolve the model choice.\n\nTo decide between the parametric and nonparametric route here, start with formal checks within both groups and for variance homogeneity. Shapiro-Wilk supports approximate within-group normality, and Levene's test checks whether the group variances are reasonably similar. Then inspect Q-Q plots and group-level histograms as secondary visual diagnostics for skewness, tails, and outliers.",
        primary_label: "Primary checks",
        primary_name: "Shapiro-Wilk by group + Levene",
        primary_why:
            "These formal checks support approximate normality within each group and variance homogeneity across groups. Prefer Levene over Bartlett here because it is more robust to non-normality.",
        primary_r:
            'by(df$y, df$group, shapiro.test)\ncar::leveneTest(y ~ group, data = df, center = median)',
        primary_py:
            'from scipy import stats\nfor g, d in df.groupby("group"):\n    print(g, stats.shapiro(d["y"].dropna()))\n\ngroup_arrays = [d["y"].dropna().to_numpy() for _, d in df.groupby("group")]\nprint(stats.levene(*group_arrays, center="median"))',
        secondary_label: "Secondary checks",
        secondary_name: "Q-Q plots + histograms by group",
        secondary_why:
            "These visual checks show whether each group is approximately symmetric, whether tails deviate from Gaussian expectations, and whether single observations dominate the shape.",
        secondary_r:
            'group_levels <- levels(factor(df$group))\npar(mfrow = c(2, length(group_levels)))\nfor (g in group_levels) {\n  values <- subset(df, group == g)$y\n  qqnorm(values, main = paste("Q-Q:", g))\n  qqline(values)\n  hist(values, main = paste("Histogram:", g), xlab = "y")\n}',
        secondary_py:
            'import matplotlib.pyplot as plt\nimport statsmodels.api as sm\n\ngroups = list(df["group"].dropna().unique())\nfig, axes = plt.subplots(2, len(groups), figsize=(5 * len(groups), 8), squeeze=False)\nfor idx, g in enumerate(groups):\n    values = df.loc[df["group"] == g, "y"].dropna()\n    sm.qqplot(values, line="45", ax=axes[0, idx])\n    axes[0, idx].set_title(f"Q-Q plot: {g}")\n    axes[1, idx].hist(values, bins="auto", color="#90caf9", edgecolor="white")\n    axes[1, idx].set_title(f"Histogram: {g}")\n    axes[1, idx].set_xlabel("y")\nplt.tight_layout()',
        decision:
            "Choose yes when the group distributions look approximately normal, outliers are not severe, and variances are not grossly heterogeneous. Choose no when the distributions are clearly skewed/heavy-tailed or dominated by outliers.",
    },
    paired_two_groups: {
        title: "Check whether the paired-difference scores are approximately parametric",
        lead:
            "More than one compatible route remains. Answer the next question to resolve the model choice.\n\nFor a paired two-condition design, the key normality target is the vector of paired differences, not the raw scores in each condition. Start with a formal normality test on the difference scores, then inspect the same difference scores visually with a Q-Q plot and histogram.",
        primary_label: "Primary checks",
        primary_name: "Shapiro-Wilk on paired differences",
        primary_why:
            "Use the test on the paired differences. Separate normality tests on each raw condition are not the relevant assumption for the paired t-test.",
        primary_r:
            'd <- df$y1 - df$y2\nshapiro.test(d)',
        primary_py:
            'from scipy import stats\n\nd = (df["y1"] - df["y2"]).dropna()\nprint(stats.shapiro(d))',
        secondary_label: "Secondary checks",
        secondary_name: "Q-Q plot + histogram of paired differences",
        secondary_why:
            "These plots make it easier to judge asymmetry, heavy tails, and outliers in the paired-difference distribution that drives the t-test assumption.",
        secondary_r:
            'd <- df$y1 - df$y2\npar(mfrow = c(1, 2))\nqqnorm(d, main = "Q-Q plot of paired differences")\nqqline(d)\nhist(d, main = "Histogram of paired differences", xlab = "difference")',
        secondary_py:
            'import matplotlib.pyplot as plt\nimport statsmodels.api as sm\n\nd = (df["y1"] - df["y2"]).dropna()\nfig, axes = plt.subplots(1, 2, figsize=(10, 4))\nsm.qqplot(d, line="45", ax=axes[0])\naxes[0].set_title("Q-Q plot of paired differences")\naxes[1].hist(d, bins="auto", color="#90caf9", edgecolor="white")\naxes[1].set_title("Histogram of paired differences")\naxes[1].set_xlabel("difference")\nplt.tight_layout()',
        decision:
            "Choose yes when the paired differences look approximately normal and are not dominated by extreme outliers. Choose no when the difference distribution is clearly non-normal or strongly asymmetric.",
    },
    anova_between: {
        title: "Check whether the one-way between-subject design supports the parametric route",
        lead:
            "More than one compatible route remains. Answer the next question to resolve the model choice.\n\nFor one-way ANOVA, start with formal checks at the model level. Shapiro-Wilk on residuals supports approximate Gaussian residuals, and Levene checks variance homogeneity across groups. Then inspect the residual Q-Q plot and group-level histograms as secondary visual diagnostics.",
        primary_label: "Primary checks",
        primary_name: "Shapiro-Wilk on residuals + Levene",
        primary_why:
            "Shapiro-Wilk gives a formal residual normality check, and Levene checks whether the group variances are sufficiently similar for the classical ANOVA route.",
        primary_r:
            'fit <- aov(y ~ group, data = df)\nshapiro.test(residuals(fit))\ncar::leveneTest(y ~ group, data = df, center = median)',
        primary_py:
            'from scipy import stats\nimport statsmodels.formula.api as smf\n\nfit = smf.ols("y ~ C(group)", data=df).fit()\nprint(stats.shapiro(fit.resid))\nprint(stats.levene(*[d["y"].dropna().to_numpy() for _, d in df.groupby("group")], center="median"))',
        secondary_label: "Secondary checks",
        secondary_name: "Residual Q-Q plot + histograms by group",
        secondary_why:
            "The residual Q-Q plot reveals departures from Gaussian residual behavior, and the group-level histograms make it easier to spot skewness or outliers in individual conditions.",
        secondary_r:
            'fit <- aov(y ~ group, data = df)\nqqnorm(residuals(fit), main = "Residual Q-Q plot")\nqqline(residuals(fit))\ngroup_levels <- levels(factor(df$group))\npar(mfrow = c(1, length(group_levels)))\nfor (g in group_levels) {\n  hist(subset(df, group == g)$y, main = paste("Histogram:", g), xlab = "y")\n}',
        secondary_py:
            'import matplotlib.pyplot as plt\nimport statsmodels.formula.api as smf\nimport statsmodels.api as sm\n\nfit = smf.ols("y ~ C(group)", data=df).fit()\nsm.qqplot(fit.resid, line="45")\nplt.title("Residual Q-Q plot")\nplt.show()\n\ngroups = list(df["group"].dropna().unique())\nfig, axes = plt.subplots(1, len(groups), figsize=(5 * len(groups), 4), squeeze=False)\nfor idx, g in enumerate(groups):\n    values = df.loc[df["group"] == g, "y"].dropna()\n    axes[0, idx].hist(values, bins="auto", color="#90caf9", edgecolor="white")\n    axes[0, idx].set_title(f"Histogram: {g}")\n    axes[0, idx].set_xlabel("y")\nplt.tight_layout()',
        decision:
            "Choose yes when residuals are approximately normal and variances are not badly unequal. If normality is acceptable but variances differ, a Welch ANOVA may still be preferable to classical ANOVA. Choose no when the group distributions or residuals are clearly non-Gaussian or strongly outlier-driven, so the rank-based Kruskal-Wallis route is more defensible.",
    },
    rm_anova: {
        title: "Check whether the repeated-measures design supports the parametric route",
        lead:
            "More than one compatible route remains. Answer the next question to resolve the model choice.\n\nFor repeated-measures ANOVA, start with formal checks that match the fitted Gaussian route. Use Shapiro-Wilk on residuals and check sphericity when a within-subject factor has more than two levels. Then inspect condition-level Q-Q plots and histograms as secondary visual diagnostics.",
        primary_label: "Primary checks",
        primary_name: "Shapiro-Wilk on residuals + Mauchly's test of sphericity",
        primary_why:
            "Shapiro-Wilk supports approximate Gaussian residuals, and sphericity is an additional formal assumption for repeated-measures ANOVA with more than two repeated levels.",
        primary_r:
            'library(afex)\nfit <- aov_ez(id = "subject", dv = "y", within = "condition", data = df)\nshapiro.test(residuals(fit$lm))\n# inspect sphericity output in fit',
        primary_py:
            'from scipy import stats\nimport pingouin as pg\nimport statsmodels.formula.api as smf\n\nfit = smf.ols("y ~ C(condition) + C(subject)", data=df).fit()\nprint(stats.shapiro(fit.resid))\nprint(pg.sphericity(data=df, dv="y", within="condition", subject="subject"))',
        secondary_label: "Secondary checks",
        secondary_name: "Q-Q plots + histograms by condition",
        secondary_why:
            "Condition-level visual checks help you spot skewness, heavy tails, and outliers that are easy to miss when reading only the formal test output.",
        secondary_r:
            'condition_levels <- levels(factor(df$condition))\npar(mfrow = c(2, length(condition_levels)))\nfor (lvl in condition_levels) {\n  values <- subset(df, condition == lvl)$y\n  qqnorm(values, main = paste("Q-Q:", lvl))\n  qqline(values)\n  hist(values, main = paste("Histogram:", lvl), xlab = "y")\n}',
        secondary_py:
            'import matplotlib.pyplot as plt\nimport statsmodels.api as sm\n\nconditions = list(df["condition"].dropna().unique())\nfig, axes = plt.subplots(2, len(conditions), figsize=(5 * len(conditions), 8), squeeze=False)\nfor idx, condition in enumerate(conditions):\n    values = df.loc[df["condition"] == condition, "y"].dropna()\n    sm.qqplot(values, line="45", ax=axes[0, idx])\n    axes[0, idx].set_title(f"Q-Q plot: {condition}")\n    axes[1, idx].hist(values, bins="auto", color="#90caf9", edgecolor="white")\n    axes[1, idx].set_title(f"Histogram: {condition}")\n    axes[1, idx].set_xlabel("y")\nplt.tight_layout()',
        decision:
            "Choose yes when the residual structure looks acceptable and, when relevant, sphericity is either met or can be handled with a correction such as Greenhouse-Geisser. Choose no when the repeated-measures distributional assumptions are clearly not acceptable.",
    },
    regression_linear: {
        title: "Check whether the Gaussian linear-regression route is appropriate",
        lead:
            "More than one compatible route remains. Answer the next question to resolve the model choice.\n\nFor linear regression, do not test the raw outcome alone. Start with formal tests on the fitted-model residuals. Shapiro-Wilk or Jarque-Bera supports approximate residual normality, and Breusch-Pagan checks heteroskedasticity. Then inspect visual residual diagnostics as secondary checks.",
        primary_label: "Primary checks",
        primary_name: "Shapiro-Wilk or Jarque-Bera on residuals + Breusch-Pagan",
        primary_why:
            "These formal checks support approximate Gaussian residuals and constant variance. Breusch-Pagan targets heteroskedasticity rather than normality.",
        primary_r:
            'fit <- lm(y ~ x, data = df)\nshapiro.test(residuals(fit))\ntseries::jarque.bera.test(residuals(fit))\nlmtest::bptest(fit)',
        primary_py:
            'from scipy import stats\nfrom statsmodels.stats.diagnostic import het_breuschpagan\nfrom statsmodels.stats.stattools import jarque_bera\nimport statsmodels.formula.api as smf\n\nfit = smf.ols("y ~ x", data=df).fit()\nprint(stats.shapiro(fit.resid))\nprint(jarque_bera(fit.resid))\nprint(het_breuschpagan(fit.resid, fit.model.exog))',
        secondary_label: "Secondary checks",
        secondary_name: "Residual Q-Q plot + residuals vs fitted + residual histogram",
        secondary_why:
            "These visual diagnostics make it easier to judge tail behavior, variance patterns, and outlier influence in the residual structure.",
        secondary_r:
            'fit <- lm(y ~ x, data = df)\npar(mfrow = c(1, 3))\nqqnorm(residuals(fit), main = "Residual Q-Q plot")\nqqline(residuals(fit))\nplot(fitted(fit), residuals(fit), xlab = "Fitted", ylab = "Residuals")\nabline(h = 0, lty = 2)\nhist(residuals(fit), main = "Residual histogram", xlab = "residual")',
        secondary_py:
            'import matplotlib.pyplot as plt\nimport statsmodels.formula.api as smf\nimport statsmodels.api as sm\n\nfit = smf.ols("y ~ x", data=df).fit()\nfig, axes = plt.subplots(1, 3, figsize=(14, 4))\nsm.qqplot(fit.resid, line="45", ax=axes[0])\naxes[0].set_title("Residual Q-Q plot")\naxes[1].scatter(fit.fittedvalues, fit.resid)\naxes[1].axhline(0, linestyle="--")\naxes[1].set_xlabel("Fitted")\naxes[1].set_ylabel("Residuals")\naxes[1].set_title("Residuals vs fitted")\naxes[2].hist(fit.resid, bins="auto", color="#90caf9", edgecolor="white")\naxes[2].set_title("Residual histogram")\naxes[2].set_xlabel("residual")\nplt.tight_layout()',
        decision:
            "Choose yes when residuals are roughly linear in the Q-Q plot, variance looks approximately constant, and no severe leverage/outlier problem dominates the fit. Choose no when residuals show clear non-normality, strong heteroskedasticity, or the relationship is not adequately linear.",
    },
    regression_multiple: {
        title: "Check whether the Gaussian multiple-regression route is appropriate",
        lead:
            "More than one compatible route remains. Answer the next question to resolve the model choice.\n\nFor multiple regression, start with formal checks on the fitted-model residuals rather than the raw variables individually. Use Shapiro-Wilk or Jarque-Bera for residual normality, Breusch-Pagan for heteroskedasticity, and VIF for collinearity. Then inspect visual residual diagnostics as secondary checks.",
        primary_label: "Primary checks",
        primary_name: "Shapiro-Wilk or Jarque-Bera on residuals + Breusch-Pagan + VIF",
        primary_why:
            "These formal checks support approximate Gaussian residuals, constant variance, and tolerable collinearity at the model level.",
        primary_r:
            'fit <- lm(y ~ x1 + x2 + x3, data = df)\nshapiro.test(residuals(fit))\ntseries::jarque.bera.test(residuals(fit))\nlmtest::bptest(fit)\ncar::vif(fit)',
        primary_py:
            'from scipy import stats\nfrom statsmodels.stats.diagnostic import het_breuschpagan\nfrom statsmodels.stats.stattools import jarque_bera\nfrom statsmodels.stats.outliers_influence import variance_inflation_factor\nimport statsmodels.formula.api as smf\n\nfit = smf.ols("y ~ x1 + x2 + x3", data=df).fit()\nprint(stats.shapiro(fit.resid))\nprint(jarque_bera(fit.resid))\nprint(het_breuschpagan(fit.resid, fit.model.exog))\nprint([variance_inflation_factor(fit.model.exog, i) for i in range(fit.model.exog.shape[1])])',
        secondary_label: "Secondary checks",
        secondary_name: "Residual Q-Q plot + residuals vs fitted + residual histogram",
        secondary_why:
            "These visual diagnostics help interpret tail behavior, variance patterns, and whether a few points dominate the fitted model.",
        secondary_r:
            'fit <- lm(y ~ x1 + x2 + x3, data = df)\npar(mfrow = c(1, 3))\nqqnorm(residuals(fit), main = "Residual Q-Q plot")\nqqline(residuals(fit))\nplot(fitted(fit), residuals(fit), xlab = "Fitted", ylab = "Residuals")\nabline(h = 0, lty = 2)\nhist(residuals(fit), main = "Residual histogram", xlab = "residual")',
        secondary_py:
            'import matplotlib.pyplot as plt\nimport statsmodels.formula.api as smf\nimport statsmodels.api as sm\n\nfit = smf.ols("y ~ x1 + x2 + x3", data=df).fit()\nfig, axes = plt.subplots(1, 3, figsize=(14, 4))\nsm.qqplot(fit.resid, line="45", ax=axes[0])\naxes[0].set_title("Residual Q-Q plot")\naxes[1].scatter(fit.fittedvalues, fit.resid)\naxes[1].axhline(0, linestyle="--")\naxes[1].set_xlabel("Fitted")\naxes[1].set_ylabel("Residuals")\naxes[1].set_title("Residuals vs fitted")\naxes[2].hist(fit.resid, bins="auto", color="#90caf9", edgecolor="white")\naxes[2].set_title("Residual histogram")\naxes[2].set_xlabel("residual")\nplt.tight_layout()',
        decision:
            "Choose yes when the model residuals are approximately normal, variance looks roughly constant, and the model is not dominated by severe collinearity or influential points. Choose no when these assumptions clearly fail and a robust or permutation-based model is more appropriate.",
    },
    factorial_between: {
        title: "Check whether the factorial between-subject design supports the parametric route",
        lead:
            "More than one compatible route remains. Answer the next question to resolve the model choice.\n\nFor factorial ANOVA, assess the fitted model rather than each cell separately in isolation. Start with formal checks on the model residuals and the cell-wise variance structure, then use visual diagnostics as secondary checks.",
        primary_label: "Primary checks",
        primary_name: "Shapiro-Wilk on residuals + Levene across cells",
        primary_why:
            "Shapiro-Wilk targets approximate Gaussian residuals, and Levene checks whether cell variances are roughly compatible with the classical factorial ANOVA route.",
        primary_r:
            'fit <- lm(y ~ A * B, data = df)\nshapiro.test(residuals(fit))\ncar::leveneTest(y ~ interaction(A, B), data = df, center = median)',
        primary_py:
            'from scipy import stats\nimport statsmodels.formula.api as smf\n\nfit = smf.ols("y ~ C(A) * C(B)", data=df).fit()\nprint(stats.shapiro(fit.resid))\nprint(stats.levene(*[d["y"].dropna().to_numpy() for _, d in df.groupby(["A", "B"])], center="median"))',
        secondary_label: "Secondary checks",
        secondary_name: "Residual Q-Q plot + histograms by cell",
        secondary_why:
            "The residual Q-Q plot reveals departures from Gaussian residual behavior, and cell-level histograms make it easier to spot skewness or outliers in specific combinations of factors.",
        secondary_r:
            'fit <- lm(y ~ A * B, data = df)\nqqnorm(residuals(fit), main = "Residual Q-Q plot")\nqqline(residuals(fit))\ncell_levels <- levels(interaction(df$A, df$B, drop = TRUE))\npar(mfrow = c(1, length(cell_levels)))\nfor (cell in cell_levels) {\n  hist(df$y[interaction(df$A, df$B, drop = TRUE) == cell], main = paste("Histogram:", cell), xlab = "y")\n}',
        secondary_py:
            'import matplotlib.pyplot as plt\nimport statsmodels.formula.api as smf\nimport statsmodels.api as sm\n\nfit = smf.ols("y ~ C(A) * C(B)", data=df).fit()\nsm.qqplot(fit.resid, line="45")\nplt.title("Residual Q-Q plot")\nplt.show()\n\ncells = list(df.groupby(["A", "B"]).groups.keys())\nfig, axes = plt.subplots(1, len(cells), figsize=(5 * len(cells), 4), squeeze=False)\nfor idx, cell in enumerate(cells):\n    values = df.loc[(df["A"] == cell[0]) & (df["B"] == cell[1]), "y"].dropna()\n    axes[0, idx].hist(values, bins="auto", color="#90caf9", edgecolor="white")\n    axes[0, idx].set_title(f"Histogram: {cell[0]} / {cell[1]}")\n    axes[0, idx].set_xlabel("y")\nplt.tight_layout()',
        decision:
            "Choose yes when the factorial-model residuals look approximately normal and the cell variances are not badly mismatched. Choose no when non-normality or outlier sensitivity clearly dominates.",
    },
    factorial_within_or_mixed: {
        title: "Check whether the repeated or mixed Gaussian model route is appropriate",
        lead:
            "More than one compatible route remains. Answer the next question to resolve the model choice.\n\nFor repeated, mixed, or Gaussian mixed-model routes, start with formal checks on the fitted Gaussian model rather than testing each raw condition separately. Use Shapiro-Wilk on residuals as the normality check, and if the intended analysis remains a repeated-measures ANOVA, also inspect sphericity where relevant. Then review visual residual diagnostics and within-condition histograms as secondary checks.",
        primary_label: "Primary checks",
        primary_name: "Shapiro-Wilk on residuals + sphericity if using repeated-measures ANOVA",
        primary_why:
            "These formal checks support approximate Gaussian residuals and, when repeated-measures ANOVA is used, the additional sphericity assumption.",
        primary_r:
            'library(lme4)\nfit <- lmer(y ~ between_factor * within_factor + (1|subject), data = df)\nshapiro.test(residuals(fit))\n# for repeated-measures ANOVA, also inspect Mauchly / GG correction output',
        primary_py:
            'from scipy import stats\n# after fitting a Gaussian mixed model:\n# print(stats.shapiro(fit.resid))\n# if a repeated-measures ANOVA is used instead, also compute sphericity with pingouin.sphericity(...)',
        secondary_label: "Secondary checks",
        secondary_name: "Residual Q-Q plot + residuals vs fitted + histograms by within condition",
        secondary_why:
            "These visual diagnostics help you judge tail behavior, variance patterns, and whether particular repeated conditions have strongly skewed or outlier-driven distributions.",
        secondary_r:
            'library(lme4)\nfit <- lmer(y ~ between_factor * within_factor + (1|subject), data = df)\npar(mfrow = c(1, 3))\nqqnorm(residuals(fit), main = "Residual Q-Q plot")\nqqline(residuals(fit))\nplot(fitted(fit), residuals(fit), xlab = "Fitted", ylab = "Residuals")\nabline(h = 0, lty = 2)\nhist(residuals(fit), main = "Residual histogram", xlab = "residual")\nwithin_levels <- levels(factor(df$within_factor))\npar(mfrow = c(1, length(within_levels)))\nfor (lvl in within_levels) {\n  hist(subset(df, within_factor == lvl)$y, main = paste("Histogram:", lvl), xlab = "y")\n}',
        secondary_py:
            'import matplotlib.pyplot as plt\nimport statsmodels.formula.api as smf\nimport statsmodels.api as sm\n\nfit = smf.mixedlm("y ~ between_factor * within_factor", data=df, groups=df["subject"]).fit()\nfig, axes = plt.subplots(1, 3, figsize=(14, 4))\nsm.qqplot(fit.resid, line="45", ax=axes[0])\naxes[0].set_title("Residual Q-Q plot")\naxes[1].scatter(fit.fittedvalues, fit.resid)\naxes[1].axhline(0, linestyle="--")\naxes[1].set_xlabel("Fitted")\naxes[1].set_ylabel("Residuals")\naxes[1].set_title("Residuals vs fitted")\naxes[2].hist(fit.resid, bins="auto", color="#90caf9", edgecolor="white")\naxes[2].set_title("Residual histogram")\naxes[2].set_xlabel("residual")\nplt.tight_layout()\n\nconditions = list(df["within_factor"].dropna().unique())\nfig, axes = plt.subplots(1, len(conditions), figsize=(5 * len(conditions), 4), squeeze=False)\nfor idx, condition in enumerate(conditions):\n    values = df.loc[df["within_factor"] == condition, "y"].dropna()\n    axes[0, idx].hist(values, bins="auto", color="#90caf9", edgecolor="white")\n    axes[0, idx].set_title(f"Histogram: {condition}")\n    axes[0, idx].set_xlabel("y")\nplt.tight_layout()',
        decision:
            "Choose yes when the Gaussian residual diagnostics look acceptable and, where ANOVA-style repeated factors are used, sphericity is either acceptable or can be corrected. Choose no when the repeated / clustered data clearly violate the Gaussian route.",
    },
    manova: {
        title: "Check whether the multivariate Gaussian route is appropriate",
        lead:
            "More than one compatible route remains. Answer the next question to resolve the model choice.\n\nFor MANOVA or MANCOVA-style routes, the key issue is multivariate, not only univariate, distributional adequacy. Start with formal checks for multivariate normality and covariance homogeneity across groups, then review univariate Q-Q plots and histograms for each outcome as secondary visual diagnostics.",
        primary_label: "Primary checks",
        primary_name: "Multivariate normality + Box's M",
        primary_why:
            "MANOVA assumes multivariate normality of the outcome vector within groups and reasonably similar covariance matrices across groups.",
        primary_r:
            'MVN::mvn(df[, c("y1", "y2")], mvnTest = "mardia")\nbiotools::boxM(df[, c("y1", "y2")], df$group)',
        primary_py:
            'from pingouin import multivariate_normality\n\nprint(multivariate_normality(df[["y1", "y2"]].dropna(), alpha=0.05))\n# add a Box\'s M implementation if available in your workflow; otherwise inspect group covariance matrices explicitly',
        secondary_label: "Secondary checks",
        secondary_name: "Q-Q plots + histograms for each outcome",
        secondary_why:
            "These plots help you see whether particular outcomes have skewness, heavy tails, or outliers that could drive multivariate problems.",
        secondary_r:
            'par(mfrow = c(2, 2))\nqqnorm(df$y1, main = "Q-Q plot: y1")\nqqline(df$y1)\nhist(df$y1, main = "Histogram: y1", xlab = "y1")\nqqnorm(df$y2, main = "Q-Q plot: y2")\nqqline(df$y2)\nhist(df$y2, main = "Histogram: y2", xlab = "y2")',
        secondary_py:
            'import matplotlib.pyplot as plt\nimport statsmodels.api as sm\n\nfig, axes = plt.subplots(2, 2, figsize=(10, 8))\nsm.qqplot(df["y1"].dropna(), line="45", ax=axes[0, 0])\naxes[0, 0].set_title("Q-Q plot: y1")\naxes[0, 1].hist(df["y1"].dropna(), bins="auto", color="#90caf9", edgecolor="white")\naxes[0, 1].set_title("Histogram: y1")\naxes[0, 1].set_xlabel("y1")\nsm.qqplot(df["y2"].dropna(), line="45", ax=axes[1, 0])\naxes[1, 0].set_title("Q-Q plot: y2")\naxes[1, 1].hist(df["y2"].dropna(), bins="auto", color="#90caf9", edgecolor="white")\naxes[1, 1].set_title("Histogram: y2")\naxes[1, 1].set_xlabel("y2")\nplt.tight_layout()',
        decision:
            "Choose yes when the multivariate outcome structure looks approximately Gaussian and covariance differences across groups are not severe. Choose no when the outcome vector is clearly non-Gaussian or dominated by outliers.",
    }
};

function detectParametricContext(rowsIgnoringParametric) {
    const sample = rowsIgnoringParametric[0];
    if (!sample) return null;
    const all = (pred) => rowsIgnoringParametric.every(pred);

    if (
        sample.dv_count === "1" &&
        sample.dv_kind === "continuous" &&
        sample.iv_count === "1" &&
        sample.iv_kind === "discrete" &&
        sample.iv_levels === "2" &&
        all((r) => r.design === "between")
    ) return "independent_two_groups";

    if (
        sample.dv_count === "1" &&
        sample.dv_kind === "continuous" &&
        sample.iv_count === "1" &&
        sample.iv_kind === "discrete" &&
        sample.iv_levels === "2" &&
        all((r) => r.design === "within")
    ) return "paired_two_groups";

    if (
        sample.dv_count === "1" &&
        sample.dv_kind === "continuous" &&
        sample.iv_count === "1" &&
        sample.iv_kind === "discrete" &&
        sample.iv_levels === "gt2" &&
        all((r) => r.design === "between")
    ) return "anova_between";

    if (
        sample.dv_count === "1" &&
        sample.dv_kind === "continuous" &&
        sample.iv_count === "1" &&
        sample.iv_kind === "discrete" &&
        sample.iv_levels === "gt2" &&
        all((r) => r.design === "within")
    ) return "rm_anova";

    if (
        sample.dv_count === "1" &&
        sample.dv_kind === "continuous" &&
        all((r) => r.iv_kind === "continuous") &&
        all((r) => !norm(r.design))
    ) {
        return sample.iv_count === "1" ? "regression_linear" : "regression_multiple";
    }

    if (
        sample.dv_count === "1" &&
        sample.dv_kind === "continuous" &&
        all((r) => r.iv_kind === "discrete") &&
        all((r) => r.design === "between")
    ) return "factorial_between";

    if (
        sample.dv_count === "1" &&
        sample.dv_kind === "continuous" &&
        (all((r) => r.design === "within") || all((r) => r.design === "both"))
    ) return "factorial_within_or_mixed";

    if (
        sample.dv_count === "1" &&
        sample.dv_kind === "continuous" &&
        all((r) => r.iv_kind === "both")
    ) {
        return sample.design === "between" ? "factorial_between" : "factorial_within_or_mixed";
    }

    if (
        sample.dv_count === "ge2" &&
        sample.dv_kind === "continuous"
    ) return "manova";

    return null;
}

function codeBlockCard(title, code) {
    const div = document.createElement("div");
    div.className = "assumption-card";
    const language = detectCodeLanguage(title);
    div.innerHTML =
        '<h3>' + escapeHtml(title) + '</h3>' +
        '<pre class="mono code-block">' + renderCodeMarkup(code || "# not available", language) + '</pre>';
    return div;
}

function createSvgElement(tagName, attributes = {}) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", tagName);

    Object.entries(attributes).forEach(([name, value]) => {
        if (value !== undefined && value !== null) {
            element.setAttribute(name, String(value));
        }
    });

    return element;
}

function scaleToRange(value, domainMin, domainMax, rangeMin, rangeMax) {
    if (domainMax === domainMin) {
        return rangeMin;
    }

    return rangeMin + ((value - domainMin) / (domainMax - domainMin)) * (rangeMax - rangeMin);
}

function mapPlotPoint(point, xDomain, yDomain, plotBox) {
    return {
        x: scaleToRange(
            point.x,
            xDomain.min,
            xDomain.max,
            plotBox.left,
            plotBox.left + plotBox.width,
        ),
        y: scaleToRange(
            point.y,
            yDomain.min,
            yDomain.max,
            plotBox.top + plotBox.height,
            plotBox.top,
        ),
    };
}

function createMiniPlotFrame(ariaLabel, axisLabels = {}) {
    const svg = createSvgElement("svg", {
        viewBox: "0 0 180 140",
        role: "img",
        "aria-label": ariaLabel,
    });
    const plotBox = {
        left: 28,
        top: 14,
        width: 140,
        height: 94,
    };

    svg.style.width = "100%";
    svg.style.height = "auto";
    svg.style.display = "block";
    svg.appendChild(
        createSvgElement("line", {
            x1: plotBox.left,
            y1: plotBox.top + plotBox.height,
            x2: plotBox.left + plotBox.width,
            y2: plotBox.top + plotBox.height,
            stroke: "#96a4b5",
            "stroke-width": 1.2,
        }),
    );
    svg.appendChild(
        createSvgElement("line", {
            x1: plotBox.left,
            y1: plotBox.top,
            x2: plotBox.left,
            y2: plotBox.top + plotBox.height,
            stroke: "#96a4b5",
            "stroke-width": 1.2,
        }),
    );

    if (axisLabels.x) {
        const xLabel = createSvgElement("text", {
            x: plotBox.left + plotBox.width / 2,
            y: 132,
            fill: "#607080",
            "font-size": 9,
            "text-anchor": "middle",
        });
        xLabel.textContent = axisLabels.x;
        svg.appendChild(xLabel);
    }

    if (axisLabels.y) {
        const yLabel = createSvgElement("text", {
            x: plotBox.left,
            y: 10,
            fill: "#607080",
            "font-size": 9,
            "text-anchor": "start",
        });
        yLabel.textContent = axisLabels.y;
        svg.appendChild(yLabel);
    }

    return {
        svg,
        plotBox,
    };
}

function createPolylinePoints(points, xDomain, yDomain, plotBox) {
    return points
        .map((point) => {
            const scaled = mapPlotPoint(point, xDomain, yDomain, plotBox);
            return scaled.x.toFixed(2) + "," + scaled.y.toFixed(2);
        })
        .join(" ");
}

function addScatterSeries(svg, points, xDomain, yDomain, plotBox, fill = "#334155") {
    points.forEach((point) => {
        const scaled = mapPlotPoint(point, xDomain, yDomain, plotBox);
        svg.appendChild(
            createSvgElement("circle", {
                cx: scaled.x,
                cy: scaled.y,
                r: 3,
                fill,
                "fill-opacity": 0.9,
            }),
        );
    });
}

function normalPdf(x, mu, sigma) {
    return Math.exp(-0.5 * ((x - mu) / sigma) ** 2) / (sigma * Math.sqrt(2 * Math.PI));
}

function gaussianCurve(mu, sigma, totalCount, binWidth, xMin, xMax, step) {
    const points = [];

    for (let x = xMin; x <= xMax; x += step) {
        points.push({
            x,
            y: totalCount * binWidth * normalPdf(x, mu, sigma),
        });
    }

    return points;
}

function createQQExampleSvg(isAcceptable) {
    const { svg, plotBox } = createMiniPlotFrame("Q-Q plot example", {
        x: "Theoretical quantiles",
        y: "Sample quantiles",
    });
    const xDomain = { min: -2.2, max: 2.2 };
    const yDomain = isAcceptable ?
        { min: -2.2, max: 2.2 } :
        { min: -2.2, max: 4.4 };
    const dataPoints = isAcceptable ? [
        { x: -2.0, y: -1.9 },
        { x: -1.5, y: -1.45 },
        { x: -1.0, y: -1.02 },
        { x: -0.5, y: -0.48 },
        { x: 0.0, y: 0.02 },
        { x: 0.5, y: 0.47 },
        { x: 1.0, y: 1.03 },
        { x: 1.5, y: 1.52 },
        { x: 2.0, y: 2.05 },
    ] : [
        { x: -1.5, y: -2.1 },
        { x: -1.0, y: -1.3 },
        { x: 0.0, y: 0.1 },
        { x: 0.5, y: 0.9 },
        { x: 1.0, y: 1.9 },
        { x: 1.5, y: 3.0 },
        { x: 2.0, y: 4.2 },
    ];

    svg.appendChild(
        createSvgElement("polyline", {
            points: createPolylinePoints(
                [
                    { x: -2.1, y: -2.1 },
                    { x: 2.1, y: 2.1 },
                ],
                xDomain,
                yDomain,
                plotBox,
            ),
            fill: "none",
            stroke: "#94a3b8",
            "stroke-width": 1.75,
            "stroke-dasharray": "5 4",
        }),
    );
    addScatterSeries(svg, dataPoints, xDomain, yDomain, plotBox);

    return svg;
}

function createResidualsVsFittedExampleSvg(isAcceptable) {
    const { svg, plotBox } = createMiniPlotFrame("Residuals versus fitted example", {
        x: "Fitted values",
        y: "Residuals",
    });
    const xDomain = { min: 1, max: 12 };
    const yDomain = { min: -2.2, max: 2.2 };
    const dataPoints = isAcceptable ? [
        { x: 1, y: -0.3 },
        { x: 2, y: 0.2 },
        { x: 3, y: -0.2 },
        { x: 4, y: 0.1 },
        { x: 5, y: -0.1 },
        { x: 6, y: 0.3 },
        { x: 7, y: -0.2 },
        { x: 8, y: 0.1 },
        { x: 9, y: -0.25 },
        { x: 10, y: 0.15 },
        { x: 11, y: -0.1 },
        { x: 12, y: 0.05 },
    ] : [
        { x: 1, y: -0.2 },
        { x: 2, y: 0.1 },
        { x: 3, y: -0.5 },
        { x: 4, y: 0.4 },
        { x: 5, y: -0.8 },
        { x: 6, y: 0.7 },
        { x: 7, y: -1.1 },
        { x: 8, y: 0.9 },
        { x: 9, y: -1.5 },
        { x: 10, y: 1.4 },
        { x: 11, y: -1.9 },
        { x: 12, y: 2.0 },
    ];

    svg.appendChild(
        createSvgElement("polyline", {
            points: createPolylinePoints(
                [
                    { x: 1, y: 0 },
                    { x: 12, y: 0 },
                ],
                xDomain,
                yDomain,
                plotBox,
            ),
            fill: "none",
            stroke: "#94a3b8",
            "stroke-width": 1.75,
            "stroke-dasharray": "5 4",
        }),
    );
    addScatterSeries(svg, dataPoints, xDomain, yDomain, plotBox);

    return svg;
}

function createHistogramExampleSvg(isAcceptable) {
    const binCenters = [-3.0, -2.5, -2.0, -1.5, -1.0, -0.5, 0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0];
    const binWidth = 0.5;
    const xDomain = { min: -3.25, max: 3.25 };
    const yDomain = { min: 0, max: 12 };
    const { svg, plotBox } = createMiniPlotFrame("Histogram example", {
        x: "Residual value",
        y: "Count",
    });
    const series = isAcceptable ? [
        {
            label: "A",
            color: "#54a2eb",
            counts: [1, 4, 7, 9, 7, 4, 1, 0, 0, 0, 0, 0, 0],
            mu: -1.5,
            sigma: 0.55,
        },
        {
            label: "B",
            color: "#4bc0c0",
            counts: [0, 0, 0, 1, 4, 7, 9, 7, 4, 1, 0, 0, 0],
            mu: 0.0,
            sigma: 0.55,
        },
        {
            label: "C",
            color: "#ff9f40",
            counts: [0, 0, 0, 0, 0, 0, 1, 4, 7, 9, 7, 4, 1],
            mu: 1.5,
            sigma: 0.55,
        },
    ] : [
        {
            label: "A",
            color: "#54a2eb",
            counts: [5, 1, 8, 2, 6, 1, 4, 0, 3, 1, 2, 0, 1],
            mu: -1.5,
            sigma: 0.4,
        },
        {
            label: "B",
            color: "#4bc0c0",
            counts: [0, 3, 1, 6, 2, 8, 3, 5, 2, 6, 1, 4, 0],
            mu: 0.0,
            sigma: 0.7,
        },
        {
            label: "C",
            color: "#ff9f40",
            counts: [2, 0, 4, 1, 0, 5, 2, 1, 6, 2, 8, 3, 5],
            mu: 1.5,
            sigma: 0.95,
        },
    ];
    const barWidth = plotBox.width / binCenters.length / 3.4;

    series.forEach((entry, seriesIndex) => {
        entry.counts.forEach((count, index) => {
            const centerX = scaleToRange(
                binCenters[index],
                xDomain.min,
                xDomain.max,
                plotBox.left,
                plotBox.left + plotBox.width,
            );
            const barHeight = scaleToRange(
                count,
                yDomain.min,
                yDomain.max,
                0,
                plotBox.height,
            );
            const x = centerX + (seriesIndex - 1) * barWidth - barWidth / 2;
            const y = plotBox.top + plotBox.height - barHeight;

            svg.appendChild(
                createSvgElement("rect", {
                    x,
                    y,
                    width: barWidth,
                    height: Math.max(barHeight, 1),
                    rx: 2,
                    ry: 2,
                    fill: entry.color,
                    "fill-opacity": 0.45,
                    stroke: entry.color,
                    "stroke-width": 0.9,
                }),
            );
        });

        const totalCount = entry.counts.reduce((sum, value) => sum + value, 0);
        svg.appendChild(
            createSvgElement("polyline", {
                points: createPolylinePoints(
                    gaussianCurve(entry.mu, entry.sigma, totalCount, binWidth, -3.2, 3.2, 0.08),
                    xDomain,
                    yDomain,
                    plotBox,
                ),
                fill: "none",
                stroke: entry.color,
                "stroke-width": 1.7,
                "stroke-dasharray": "4 3",
            }),
        );
    });

    return svg;
}

function diagnosticText(guide) {
    return [guide.secondary_name, guide.secondary_why]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
}

function qqExampleTitle(guide) {
    const name = (guide.secondary_name || "").toLowerCase();

    if (name.includes("paired differences")) {
        return "Q-Q plot of paired differences";
    }
    if (name.includes("residual q-q")) {
        return "Residual Q-Q plot";
    }
    if (name.includes("each outcome")) {
        return "Q-Q plots by outcome";
    }
    if (name.includes("condition")) {
        return "Q-Q plots by condition";
    }
    if (name.includes("group")) {
        return "Q-Q plots by group";
    }

    return "Q-Q plot";
}

function histogramExampleTitle(guide) {
    const name = guide.secondary_name || "";
    const histogramPhrase = name.match(/histograms?[^+]+/i);

    if (/paired differences/i.test(name)) {
        return "Histogram of paired differences";
    }
    if (histogramPhrase) {
        return histogramPhrase[0].trim();
    }
    if (/residual histogram/i.test(name)) {
        return "Residual histogram";
    }

    return "Histogram";
}

function buildParametricVisualExampleSpecs(guide) {
    const text = diagnosticText(guide);
    const specs = [];

    if (text.includes("q-q")) {
        specs.push({
            key: "qq",
            title: qqExampleTitle(guide),
            acceptableCaption:
                "Points stay close to the reference line without strong tail bends.",
            concerningCaption:
                "Strong curvature, tail departures, or isolated jumps suggest non-Gaussian behavior.",
            render: createQQExampleSvg,
        });
    }

    if (text.includes("residuals vs fitted")) {
        specs.push({
            key: "rvf",
            title: "Residuals vs fitted",
            acceptableCaption:
                "Residuals stay centered around zero with roughly constant spread.",
            concerningCaption:
                "Funnels, trends, or systematic curves suggest heteroskedasticity or nonlinearity.",
            render: createResidualsVsFittedExampleSvg,
        });
    }

    if (text.includes("histogram")) {
        specs.push({
            key: "hist",
            title: histogramExampleTitle(guide),
            acceptableCaption:
                "Shapes are roughly symmetric without one group or condition being driven by a few extremes.",
            concerningCaption:
                "Skewed, irregular, or outlier-driven shapes weaken the Gaussian route.",
            render: createHistogramExampleSvg,
        });
    }

    return specs;
}

function createVisualStatusPill(label, isAcceptable) {
    const pill = document.createElement("div");
    pill.textContent = label;
    pill.style.display = "inline-flex";
    pill.style.alignItems = "center";
    pill.style.justifyContent = "center";
    pill.style.padding = "4px 9px";
    pill.style.borderRadius = "999px";
    pill.style.fontSize = "12px";
    pill.style.fontWeight = "700";
    pill.style.letterSpacing = "0.01em";
    pill.style.background = isAcceptable ? "#edf7ed" : "#fdeeee";
    pill.style.color = isAcceptable ? "#1f7a3d" : "#b42318";
    pill.style.border = isAcceptable ? "1px solid #b7dfbf" : "1px solid #f5c2c7";
    return pill;
}

function createParametricVisualExamples(guide) {
    const specs = buildParametricVisualExampleSpecs(guide);

    if (!specs.length) {
        return null;
    }

    const section = document.createElement("div");
    section.className = "unified-card";
    section.style.marginTop = "12px";

    const title = document.createElement("h3");
    title.textContent = "Visual examples";
    section.appendChild(title);

    const intro = document.createElement("p");
    intro.textContent =
        "Use these mini examples as a quick visual reference for the secondary checks listed above.";
    section.appendChild(intro);

    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(auto-fit, minmax(230px, 1fr))";
    grid.style.gap = "12px";
    grid.style.marginTop = "12px";

    specs.forEach((spec) => {
        const card = document.createElement("div");
        card.style.minWidth = "0";
        card.style.padding = "14px";
        card.style.borderRadius = "16px";
        card.style.border = "1px solid rgba(49, 74, 103, 0.12)";
        card.style.background = "#fbfcfe";

        const cardTitle = document.createElement("h3");
        cardTitle.textContent = spec.title;
        cardTitle.style.marginBottom = "10px";
        card.appendChild(cardTitle);

        const compareGrid = document.createElement("div");
        compareGrid.style.display = "grid";
        compareGrid.style.gridTemplateColumns = "repeat(auto-fit, minmax(140px, 1fr))";
        compareGrid.style.gap = "10px";

        [
            {
                label: "Acceptable",
                isAcceptable: true,
                caption: spec.acceptableCaption,
            },
            {
                label: "Concerning",
                isAcceptable: false,
                caption: spec.concerningCaption,
            },
        ].forEach((variant) => {
            const variantWrap = document.createElement("div");
            variantWrap.style.minWidth = "0";

            const label = createVisualStatusPill(variant.label, variant.isAcceptable);
            label.style.marginBottom = "8px";
            variantWrap.appendChild(label);
            variantWrap.appendChild(spec.render(variant.isAcceptable));

            const caption = document.createElement("p");
            caption.className = "small";
            caption.textContent = variant.caption;
            caption.style.margin = "8px 0 0";
            variantWrap.appendChild(caption);

            compareGrid.appendChild(variantWrap);
        });

        card.appendChild(compareGrid);
        grid.appendChild(card);
    });

    section.appendChild(grid);
    return section;
}

function createConfidenceIntervalBadge(label, tone) {
    const badge = document.createElement("div");
    const palette = {
        positive: {
            background: "#edf7ed",
            color: "#1f7a3d",
            border: "#b7dfbf",
        },
        neutral: {
            background: "#f5f7fb",
            color: "#526476",
            border: "#d7dee8",
        },
        negative: {
            background: "#fdeeee",
            color: "#b42318",
            border: "#f5c2c7",
        },
    };
    const selectedPalette = palette[tone] || palette.neutral;

    badge.textContent = label;
    badge.style.display = "inline-flex";
    badge.style.alignItems = "center";
    badge.style.justifyContent = "center";
    badge.style.padding = "4px 9px";
    badge.style.borderRadius = "999px";
    badge.style.fontSize = "12px";
    badge.style.fontWeight = "700";
    badge.style.letterSpacing = "0.01em";
    badge.style.background = selectedPalette.background;
    badge.style.color = selectedPalette.color;
    badge.style.border = "1px solid " + selectedPalette.border;
    return badge;
}

function createConfidenceIntervalExampleSvg(example) {
    const svg = createSvgElement("svg", {
        viewBox: "0 0 160 156",
        role: "img",
        "aria-label": example.label,
    });
    const plotBox = {
        left: 26,
        top: 12,
        width: 116,
        height: 110,
    };
    const yDomain = { min: 0, max: 10 };
    const labels = ["A", "B"];
    const barPositions = [62, 106];
    const barWidth = 22;

    svg.style.width = "100%";
    svg.style.height = "auto";
    svg.style.display = "block";

    svg.appendChild(
        createSvgElement("line", {
            x1: plotBox.left,
            y1: plotBox.top + plotBox.height,
            x2: plotBox.left + plotBox.width,
            y2: plotBox.top + plotBox.height,
            stroke: "#96a4b5",
            "stroke-width": 1.2,
        }),
    );
    svg.appendChild(
        createSvgElement("line", {
            x1: plotBox.left,
            y1: plotBox.top,
            x2: plotBox.left,
            y2: plotBox.top + plotBox.height,
            stroke: "#96a4b5",
            "stroke-width": 1.2,
        }),
    );

    example.values.forEach((value, index) => {
        const error = example.errors[index];
        const centerX = barPositions[index];
        const barHeight = scaleToRange(value, yDomain.min, yDomain.max, 0, plotBox.height);
        const barTop = plotBox.top + plotBox.height - barHeight;
        const errorTop = scaleToRange(
            error.high,
            yDomain.min,
            yDomain.max,
            plotBox.top + plotBox.height,
            plotBox.top,
        );
        const errorBottom = scaleToRange(
            error.low,
            yDomain.min,
            yDomain.max,
            plotBox.top + plotBox.height,
            plotBox.top,
        );

        svg.appendChild(
            createSvgElement("rect", {
                x: centerX - barWidth / 2,
                y: barTop,
                width: barWidth,
                height: Math.max(barHeight, 1),
                fill: "#c7d0db",
                stroke: "#546576",
                "stroke-width": 1.1,
            }),
        );
        svg.appendChild(
            createSvgElement("line", {
                x1: centerX,
                y1: errorTop,
                x2: centerX,
                y2: errorBottom,
                stroke: "#546576",
                "stroke-width": 1.5,
            }),
        );
        svg.appendChild(
            createSvgElement("line", {
                x1: centerX - 5,
                y1: errorTop,
                x2: centerX + 5,
                y2: errorTop,
                stroke: "#546576",
                "stroke-width": 1.5,
            }),
        );
        svg.appendChild(
            createSvgElement("line", {
                x1: centerX - 5,
                y1: errorBottom,
                x2: centerX + 5,
                y2: errorBottom,
                stroke: "#546576",
                "stroke-width": 1.5,
            }),
        );

        const label = createSvgElement("text", {
            x: centerX,
            y: 144,
            fill: "#526476",
            "font-size": 11,
            "font-weight": 700,
            "text-anchor": "middle",
        });
        label.textContent = labels[index];
        svg.appendChild(label);
    });

    return svg;
}

function shouldShowConfidenceIntervalExamples(options = {}) {
    const {
        estimateScale = "",
        sourceType = "row",
        rowId = "",
        testName = "",
        procedureId = "",
    } = options;

    if (estimateScale !== "difference") {
        return false;
    }

    if (sourceType === "posthoc") {
        return [
            "ph_a05_tukey_hsd",
            "ph_a05_games_howell",
            "ph_a05_dunnett",
            "ph_model_pairwise_emmeans",
            "ph_model_simple_effects",
            "ph_model_interaction_slices",
            "ph_model_treatment_vs_control",
            "ph_model_custom_contrasts",
        ].includes(procedureId);
    }

    if (["A01", "A02", "A05", "A06", "A13", "A14", "A17", "A18"].includes(rowId)) {
        return true;
    }

    return /t-test|anova|ancova/i.test(String(testName || ""));
}

function createConfidenceIntervalExamplesCard(options = {}) {
    if (!shouldShowConfidenceIntervalExamples(options)) {
        return null;
    }

    const examples = [
        {
            label: "Clear separation of group means",
            values: [6.6, 3.1],
            errors: [
                { low: 6.0, high: 7.2 },
                { low: 2.5, high: 3.7 },
            ],
            badge: "clear separation",
            tone: "positive",
            caption: "A clear gap between the 95% CIs supports a visible difference.",
        },
        {
            label: "Wide intervals with some overlap",
            values: [6.6, 3.1],
            errors: [
                { low: 4.2, high: 9.0 },
                { low: 0.7, high: 5.5 },
            ],
            badge: "inconclusive",
            tone: "neutral",
            caption: "Wide intervals mean low precision. Visual overlap alone is not a formal hypothesis test.",
        },
        {
            label: "One mean inside the other interval",
            values: [6.6, 4.6],
            errors: [
                { low: 5.9, high: 7.3 },
                { low: 2.0, high: 7.2 },
            ],
            badge: "inconclusive",
            tone: "neutral",
            caption: "One mean can fall inside the other CI. Read this as uncertainty, not as proof of equality.",
        },
        {
            label: "Strong overlap of intervals",
            values: [6.5, 5.2],
            errors: [
                { low: 4.1, high: 8.9 },
                { low: 3.0, high: 7.4 },
            ],
            badge: "little visual separation",
            tone: "negative",
            caption: "Heavy overlap makes a clear visual difference unlikely from the plotted means alone.",
        },
    ];

    const card = document.createElement("div");
    card.className = "effect-interpret-card";
    card.style.gridColumn = "1 / -1";

    const title = document.createElement("h4");
    title.textContent = "Confidence-interval examples";
    card.appendChild(title);

    const lead = document.createElement("p");
    lead.textContent =
        options.sourceType === "posthoc"
            ? "Use these plots as a quick heuristic for mean-difference style contrasts. For post-hoc results, rely on the directly reported contrast CI, especially after multiplicity adjustment."
            : "Use these plots as a quick heuristic for comparing two means or two planned mean-like contrasts. CI overlap alone is not an exact significance test.";
    card.appendChild(lead);

    const note = document.createElement("p");
    note.className = "legacy-note";
    note.textContent =
        "Read the point estimate together with the interval width. Narrower intervals mean more precision; wider intervals mean more uncertainty.";
    card.appendChild(note);

    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(auto-fit, minmax(160px, 1fr))";
    grid.style.gap = "10px";
    grid.style.marginTop = "12px";

    examples.forEach((example) => {
        const exampleCard = document.createElement("div");
        exampleCard.style.minWidth = "0";
        exampleCard.style.padding = "12px";
        exampleCard.style.border = "1px solid #d8e0ea";
        exampleCard.style.borderRadius = "12px";
        exampleCard.style.background = "#fbfcfe";

        const badge = createConfidenceIntervalBadge(example.badge, example.tone);
        badge.style.marginBottom = "8px";
        exampleCard.appendChild(badge);
        exampleCard.appendChild(createConfidenceIntervalExampleSvg(example));

        const caption = document.createElement("p");
        caption.className = "small";
        caption.textContent = example.caption;
        caption.style.margin = "8px 0 0";
        exampleCard.appendChild(caption);

        grid.appendChild(exampleCard);
    });

    card.appendChild(grid);
    return card;
}

function renderParametricGuidance() {
    const matchIgnoring = matchingRowsIgnoring("dv_parametric");
    const allowedChoices = optionsForStage("dv_parametric");
    const contextKey = detectParametricContext(matchIgnoring);
    const guide = contextKey ? parametricGuidance[contextKey] : null;

    if (!guide) {
        resultArea.innerHTML =
            '<p class="small">More than one compatible route remains. Answer the next question to resolve the model choice.</p>';
        return;
    }

    resultArea.innerHTML = "";
    const panel = document.createElement("div");
    panel.className = "unified-panel";

    const intro = document.createElement("div");
    intro.className = "unified-intro";
    intro.innerHTML =
        '<h3>' + escapeHtml(guide.title) + '</h3>' +
        '<p>' + escapeHtml(guide.lead) + '</p>';
    panel.appendChild(intro);

    const grid = document.createElement("div");
    grid.className = "unified-grid";

    const primaryCard = document.createElement("div");
    primaryCard.className = "unified-card";
    primaryCard.innerHTML =
        '<h3>' + escapeHtml(guide.primary_label || "Primary checks") + '</h3>' +
        '<p><strong>' + escapeHtml(guide.primary_name) + '</strong><br>' +
        escapeHtml(guide.primary_why) + '</p>';
    grid.appendChild(primaryCard);

    const secondaryCard = document.createElement("div");
    secondaryCard.className = "unified-card";
    secondaryCard.innerHTML =
        '<h3>' + escapeHtml(guide.secondary_label || "Secondary checks") + '</h3>' +
        '<p><strong>' + escapeHtml(guide.secondary_name) + '</strong><br>' +
        escapeHtml(guide.secondary_why) + '</p>';
    grid.appendChild(secondaryCard);
    panel.appendChild(grid);

    const visualExamples = createParametricVisualExamples(guide);
    if (visualExamples) {
        panel.appendChild(visualExamples);
    }

    panel.appendChild(
        createDecisionBanner(guide.decision, {
            allowedChoices,
        }),
    );

    const codeGrid = document.createElement("div");
    codeGrid.className = "code-grid";
    codeGrid.appendChild(
        codeCard(
            "R",
            '# ' + (guide.primary_label || 'Primary checks') + '\n' + (guide.primary_r || '# not available') +
            '\n\n# ' + (guide.secondary_label || 'Secondary checks') + '\n' + (guide.secondary_r || '# not available'),
            '',
        ),
    );
    codeGrid.appendChild(
        codeCard(
            "Python",
            '# ' + (guide.primary_label || 'Primary checks') + '\n' + (guide.primary_py || '# not available') +
            '\n\n# ' + (guide.secondary_label || 'Secondary checks') + '\n' + (guide.secondary_py || '# not available'),
            '',
        ),
    );
    panel.appendChild(codeGrid);

    resultArea.appendChild(panel);
}

function effectProfile(testName) {
    const t = testName.toLowerCase();
    if (
        /aligned rank transform|art\b|stuart-maxwell|bowker|marginal homogeneity|symmetry test/.test(
            t,
        )
    ) {
        return { label: "", r: "", py: "" };
    }
    const specs = [
        {
            pattern: "independent-samples t-test|welch",
            label: "Cohen's d, Hedges' g",
            r: "effectsize::cohens_d(y ~ group, data = df)\neffectsize::hedges_g(y ~ group, data = df)",
            py: 'import pingouin as pg\npg.compute_effsize(x1, x2, eftype="cohen")\npg.compute_effsize(x1, x2, eftype="hedges")',
        },
        {
            pattern: "paired-samples t-test",
            label: "Cohen's dz, Hedges' gav",
            r: "effectsize::cohens_d(df$y1, df$y2, paired = TRUE)\n# report dz or gav explicitly",
            py: 'import pingouin as pg\npg.compute_effsize(x1, x2, paired=True, eftype="cohen")',
        },
        {
            pattern: "anova|ancova",
            label: "eta^2, partial eta^2, generalized eta^2, omega^2, Cohen's f",
            r: "effectsize::eta_squared(fit)\neffectsize::omega_squared(fit)\neffectsize::cohens_f(fit)",
            py: "# statsmodels / pingouin output often includes np2\n# compute additional measures from sums of squares if needed",
        },
        {
            pattern: "mann-whitney",
            label: "rank-biserial r, Cliff's delta",
            r: "effectsize::rank_biserial(y ~ group, data = df)\neffsize::cliff.delta(y ~ group, data = df)",
            py: "import pingouin as pg\npg.mwu(x1, x2)  # includes RBC",
        },
        {
            pattern: "wilcoxon signed-rank",
            label: "matched rank-biserial r",
            r: "effectsize::rank_biserial(df$y1, df$y2, paired = TRUE)",
            py: "import pingouin as pg\npg.wilcoxon(x1, x2)  # includes RBC",
        },
        {
            pattern: "kruskal",
            label: "epsilon^2, eta^2(H)",
            r: "rstatix::kruskal_effsize(df, y ~ group)",
            py: "# derive epsilon^2 from H and sample size",
        },
        {
            pattern: "friedman",
            label: "Kendall's W",
            r: "rstatix::friedman_effsize(df, y ~ condition | subject)",
            py: 'import pingouin as pg\npg.friedman(data=df, dv="y", within="condition", subject="subject")',
        },
        {
            pattern:
                "regression|linear mixed model|robust linear mixed model|mixed anova or linear mixed model",
            label: "R^2, adjusted R^2, marginal / conditional R^2, standardized beta, f^2",
            r: "performance::r2(fit)\nperformance::r2_nakagawa(fit)\nparameters::standardize_parameters(fit)",
            py: "# OLS: fit.rsquared, fit.rsquared_adj\n# Mixed models: use model-specific pseudo-R^2 or standardized coefficients where available",
        },
        {
            pattern: "chi-square|fisher",
            label: "phi, Cramer's V, odds ratio (2x2)",
            r: "effectsize::phi(tab)\neffectsize::cramers_v(tab)\nepitools::oddsratio(tab)",
            py: 'from scipy.stats.contingency import association\nassociation(tab, method="cramer")',
        },
        {
            pattern: "logistic|gee logistic|ordinal|multinomial",
            label: "odds ratios / relative risk ratios, pseudo-R^2",
            r: "exp(coef(fit))\nperformance::r2_tjur(fit)",
            py: "# exponentiate coefficients for OR / RRR\n# report a pseudo-R^2 suited to the fitted model",
        },
        {
            pattern:
                "poisson|negative binomial|gee count|count glmm",
            label: "incidence rate ratios, pseudo-R^2",
            r: "exp(coef(fit))\n# report IRRs and a model-appropriate pseudo-R^2",
            py: "# exponentiate coefficients for IRRs\n# add a suitable pseudo-R^2",
        },
        {
            pattern: "manova",
            label: "Pillai / Wilks omnibus measures; then univariate effect sizes",
            r: '# summary(fit, test = "Pillai")\n# then fit follow-up univariate models for effect sizes',
            py: "# extract Pillai/Wilks from mv_test(); then compute univariate effect sizes in follow-up models",
        },
        {
            pattern: "permanova|permancova",
            label: "pseudo-R^2",
            r: "vegan::adonis2(...)  # reports R2 / pseudo-R2",
            py: "# read pseudo-R^2 from permanova output",
        },
        {
            pattern: "art anova",
            label: "",
            r: "",
            py: "",
        },
    ];
    for (const spec of specs) {
        if (new RegExp(spec.pattern, "i").test(t))
            return { label: spec.label, r: spec.r, py: spec.py };
    }
    return { label: "row-specific effect sizes", r: "", py: "" };
}

function effectItemsForRow(r) {
    const items = parseEffectItems(r);
    return items.length
        ? items
        : [
            effectProfile(r.recommended_test).label ||
            "row-specific effect sizes",
        ];
}
function interpretationHint(testName) {
    const t = testName.toLowerCase();
    if (/t-test/.test(t))
        return "Interpret the mean difference together with its confidence interval and the standardized mean-difference effect size.";
    if (/anova|ancova/.test(t))
        return "Interpret the omnibus effect first, then inspect planned contrasts or post hoc comparisons if needed.";
    if (/mann-whitney|wilcoxon|kruskal|friedman/.test(t))
        return "Interpret the result primarily as a rank-based or distributional effect unless stronger assumptions justify location-based language.";
    if (/regression/.test(t))
        return "Interpret the sign and size of the coefficients, model fit, and whether assumptions or robustness checks support the conclusion.";
    if (/mixed model|lmm/.test(t))
        return "Interpret fixed effects together with uncertainty and report marginal or conditional fit measures where appropriate.";
    if (/logistic|ordinal|multinomial/.test(t))
        return "Interpret exponentiated coefficients as odds-based effects and report a suitable pseudo-R^2.";
    if (/poisson|negative binomial|count/.test(t))
        return "Interpret exponentiated coefficients as incidence-rate effects and check dispersion or zero inflation if relevant.";
    if (/chi-square|fisher|mcnemar|bowker|stuart-maxwell/.test(t))
        return "Interpret the table pattern together with the omnibus statistic and inspect cell residuals or off-diagonal asymmetries when they are substantively important.";
    if (/manova/.test(t))
        return "Interpret the multivariate omnibus first and then move to protected univariate follow-ups if warranted.";
    if (/permanova|permancova/.test(t))
        return "Interpret the omnibus pseudo-R^2 carefully and consider whether follow-up contrasts or dispersion checks are needed.";
    return "Interpret the primary parameter estimate, uncertainty interval, and the matching effect-size metric together.";
}

function hasOnlyEffectNote(effectNames = []) {
    return effectNames.length === 1 && isEffectNote(effectNames[0]);
}

function reportingTip(r) {
    const base =
        "Report the chosen model, the main test statistic, p value or Bayes factor if applicable, confidence interval where available, and the selected effect-size measure(s).";
    if (r.posthoc && r.posthoc.available) {
        return (
            base +
            " For each post hoc contrast, also report the estimate, standard error, test statistic, degrees of freedom or asymptotic basis, confidence interval, adjusted p value, effect size, multiplicity method, and estimate scale."
        );
    }
    return base;
}

let accordionIdCounter = 0;

/* Reuse Bootstrap accordions for secondary details so collapsed content behaves consistently across the toolkit. */
function createAccordionItem(title, content, options = {}) {
    const { show = false } = options;
    const itemId = `decisionTreeAccordion${accordionIdCounter++}`;
    const item = document.createElement("div");
    item.className = "accordion-item";

    const header = document.createElement("h3");
    header.className = "accordion-header";
    header.id = `${itemId}Header`;

    const button = document.createElement("button");
    button.className = `accordion-button${show ? "" : " collapsed"}`;
    button.type = "button";
    button.setAttribute("data-bs-toggle", "collapse");
    button.setAttribute("data-bs-target", `#${itemId}Collapse`);
    button.setAttribute("aria-expanded", show ? "true" : "false");
    button.setAttribute("aria-controls", `${itemId}Collapse`);
    button.textContent = title;
    header.appendChild(button);
    item.appendChild(header);

    const collapse = document.createElement("div");
    collapse.id = `${itemId}Collapse`;
    collapse.className = `accordion-collapse collapse${show ? " show" : ""}`;
    collapse.setAttribute("aria-labelledby", `${itemId}Header`);

    const body = document.createElement("div");
    body.className = "accordion-body";

    if (typeof content === "string") {
        body.innerHTML = content;
    } else if (Array.isArray(content)) {
        content.forEach((entry) => body.appendChild(entry));
    } else if (content) {
        body.appendChild(content);
    }

    collapse.appendChild(body);
    item.appendChild(collapse);
    return item;
}

function codeCard(title, code, extra) {
    const div = document.createElement("div");
    div.className = "card code-card";
    const language = detectCodeLanguage(title);

    const heading = document.createElement("h3");
    heading.style.margin = "0";
    heading.style.fontSize = "1rem";
    heading.innerHTML =
        '<i class="bi bi-code-square code-card-icon" aria-hidden="true"></i>' +
        '<span>' + escapeHtml(title) + '</span>';
    div.appendChild(heading);

    const mainSection = document.createElement("div");
    mainSection.className = "code-card-section";
    const mainLabel = document.createElement("h4");
    mainLabel.textContent = "Main code";
    mainSection.appendChild(mainLabel);
    const mainCode = document.createElement("pre");
    mainCode.className = "mono code-block";
    mainCode.innerHTML = renderCodeMarkup(code || "# not available", language);
    mainSection.appendChild(mainCode);
    div.appendChild(mainSection);

    if (extra) {
        const extraSection = document.createElement("div");
        extraSection.className = "code-card-section";
        const extraLabel = document.createElement("h4");
        extraLabel.textContent = "Effect sizes";
        extraSection.appendChild(extraLabel);
        const extraCode = document.createElement("pre");
        extraCode.className = "mono code-block";
        extraCode.innerHTML = renderCodeMarkup(extra, language);
        extraSection.appendChild(extraCode);
        div.appendChild(extraSection);
    }
    return div;
}

/* =============================
   UI state for post-hoc selections
   ============================= */
const posthocSelectionState = {};
const adjustMethodLabels = {
    holm: "Holm",
    bonferroni: "Bonferroni",
    BH: "Benjamini-Hochberg",
    BY: "Benjamini-Yekutieli",
    tukey: "Tukey",
    dunnett: "Dunnett",
    mvt: "Multivariate t",
    "games-howell": "Games-Howell",
    nemenyi: "Nemenyi",
};
const estimateScaleLabels = {
    difference: "difference",
    odds_ratio: "odds ratio",
    rate_ratio: "rate ratio",
    relative_risk_ratio: "relative risk ratio",
    rank_difference: "rank-based contrast",
    paired_rank_difference: "paired rank-based contrast",
    table_localization: "cellwise localization",
};
const effectSizeLabels = {
    mean_diff: "Mean difference",
    cohens_d: "Cohen's d",
    hedges_g: "Hedges' g",
    odds_ratio: "Odds ratio",
    rate_ratio: "Rate ratio",
    relative_risk_ratio: "Relative risk ratio",
    rank_biserial: "Rank-biserial r",
    matched_rank_biserial: "Matched rank-biserial r",
    cliffs_delta: "Cliff's delta",
    standardized_residual: "Standardized residual",
    cramers_v: "Cramer's V",
    cohens_h: "Cohen's h",
    risk_ratio: "Risk ratio",
    estimate: "Model-based estimate",
};

function prettyAdjustMethod(method) {
    return adjustMethodLabels[method] || method || "—";
}

function prettyEffectSize(effectName) {
    return effectSizeLabels[effectName] || effectName || "—";
}

function prettySourceKind(kind) {
    const kindLabels = {
        primary: "primary",
        official_docs: "official docs",
        society_guideline: "guideline",
        secondary: "secondary",
    };
    return kindLabels[kind] || kind || "source";
}

function statsmodelsAdjustMethod(adjustMethod) {
    const methodMap = {
        holm: "holm",
        bonferroni: "bonferroni",
        BH: "fdr_bh",
        BY: "fdr_by",
    };
    return methodMap[adjustMethod] || String(adjustMethod || "holm").toLowerCase();
}

function pingouinAdjustMethod(adjustMethod) {
    const methodMap = {
        holm: "holm",
        bonferroni: "bonf",
        BH: "fdr_bh",
        BY: "fdr_by",
    };
    return methodMap[adjustMethod] || String(adjustMethod || "holm").toLowerCase();
}

function isEffectNote(effectName) {
    return /no standard omnibus effect size/i.test(String(effectName || ""));
}

function prettyEstimateScale(scale) {
    return estimateScaleLabels[scale] || scale || "—";
}

function formatDecisionRuleHTML(text, allowedChoices = []) {
    const allowed = new Set((allowedChoices || []).map((choice) => String(choice).toLowerCase()));
    const buildChoiceButton = (choice) => {
        const normalizedChoice = String(choice).toLowerCase();
        const isAllowed = allowed.has(normalizedChoice);
        const disabledAttr = isAllowed ? "" : ' disabled aria-disabled="true"';
        return `<button type="button" class="decision-pill ${normalizedChoice}" data-decision-choice="${normalizedChoice}"${disabledAttr}>Choose ${normalizedChoice}</button>`;
    };
    const decisionText = String(text || "").trim();
    const matchYes = decisionText.match(/Choose yes\b([\s\S]*?)(?=Choose no\b|$)/i);
    const matchNo = decisionText.match(/Choose no\b([\s\S]*?)(?=$)/i);
    const rows = [];

    if (matchYes && !(allowed.size === 1 && allowed.has("no"))) {
        rows.push(
            '<div class="decision-rule-grid">' +
            `<div class="decision-rule-action">${buildChoiceButton("yes")}</div>` +
            `<div class="decision-rule-copy">${escapeHtml(matchYes[1].trim().replace(/\.$/, ""))}.</div>` +
            '</div>',
        );
    }

    if (matchNo && !(allowed.size === 1 && allowed.has("yes"))) {
        rows.push(
            '<div class="decision-rule-grid">' +
            `<div class="decision-rule-action">${buildChoiceButton("no")}</div>` +
            `<div class="decision-rule-copy">${escapeHtml(matchNo[1].trim().replace(/\.$/, ""))}.</div>` +
            '</div>',
        );
    }

    if (rows.length) {
        return rows.join("");
    }

    return `<div class="decision-rule-copy">${escapeHtml(decisionText)}</div>`;
}

function applyDecisionRuleChoice(choice) {
    if (currentStageKey() !== "dv_parametric") {
        return;
    }

    const allowedChoices = optionsForStage("dv_parametric").map((option) =>
        String(option).toLowerCase(),
    );
    if (!allowedChoices.includes(String(choice).toLowerCase())) {
        return;
    }

    clearFrom("dv_parametric");
    answers.dv_parametric = choice;
    selectedResult = null;
    pendingResultScroll = false;
    pendingAssumptionScroll = false;
    pendingTreeViewportScroll = true;
    render();
    scrollToSection("treeSection");
}

function createDecisionBanner(text, options = {}) {
    const { allowedChoices = [] } = options;
    const banner = document.createElement("div");
    banner.className = "decision-banner";
    banner.innerHTML =
        '<div class="decision-title">Decision rule</div>' +
        '<div class="decision-rule-text">' + formatDecisionRuleHTML(text, allowedChoices) + '</div>';
    banner.querySelectorAll("[data-decision-choice]").forEach((button) =>
        button.addEventListener("click", () => {
            if (button.disabled) {
                return;
            }

            applyDecisionRuleChoice(button.getAttribute("data-decision-choice"));
        }),
    );
    return banner;
}


function normalizeInterpretationRow(row) {
    if (!Array.isArray(row)) return ["", ""];
    if (row.length >= 3) {
        const left = [row[0], row[1]].filter(Boolean).join(" — ");
        const right = row.slice(2).filter(Boolean).join(" ");
        return [left, right];
    }
    if (row.length === 2) return [row[0], row[1]];
    if (row.length === 1) return [row[0], ""];
    return ["", ""];
}

function createInterpretationTable(headers, rows) {
    const table = document.createElement("table");
    table.className = "interpretation-table";

    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    ["Range / Value", "How to read it"].forEach((header) => {
        const th = document.createElement("th");
        th.textContent = header;
        headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    rows.forEach((row) => {
        const tr = document.createElement("tr");
        const normalized = normalizeInterpretationRow(row);
        normalized.forEach((value) => {
            const td = document.createElement("td");
            td.textContent = value;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
}

function createInterpretationSources(sources = []) {
    if (!sources.length) return null;
    const wrap = document.createElement("div");
    wrap.className = "interpretation-sources";
    wrap.innerHTML = '<strong>Sources:</strong> ';
    sources.forEach((source, index) => {
        const label = `${source.label}${source.kind ? ` [${prettySourceKind(source.kind)}]` : ""}`;
        const node = source.url
            ? document.createElement("a")
            : document.createElement("span");
        if (source.url) {
            node.href = source.url;
            node.target = "_blank";
            node.rel = "noopener noreferrer";
        }
        node.textContent = label;
        wrap.appendChild(node);
        if (index < sources.length - 1) {
            wrap.appendChild(document.createTextNode(" · "));
        }
    });
    return wrap;
}

function createInterpretationCard(title, lead, headers = [], rows = [], note = "", sources = []) {
    const card = document.createElement("div");
    card.className = "interpretation-card";
    card.innerHTML = '<h4>' + escapeHtml(title) + '</h4><p>' + escapeHtml(lead) + '</p>';
    if (rows.length) {
        card.appendChild(createInterpretationTable(headers, rows));
    }
    if (note) {
        const noteEl = document.createElement("div");
        noteEl.className = "effect-interpret-note";
        noteEl.textContent = note;
        card.appendChild(noteEl);
    }
    const sourceEl = createInterpretationSources(sources);
    if (sourceEl) card.appendChild(sourceEl);
    return card;
}

// Legacy source set kept only as an internal reference while the UI now uses
// the curated scientific_interpretation_sources collection below.
const legacy_interpretation_sources = {
    cohen_1988: {
        label: "Cohen (1988), Statistical Power Analysis for the Behavioral Sciences",
        kind: "primary",
    },
    cohen_1992: {
        label: "Cohen (1992), A power primer",
        kind: "primary",
    },
    effectsize_guide: {
        label: "effectsize getting-started guide",
        url: "https://easystats.github.io/effectsize/articles/effectsize.html",
        kind: "official_docs",
    },
    effectsize_interpret_r: {
        label: "effsize: Cliff’s delta thresholds (Romano et al., 2006)",
        url: "https://rdrr.io/github/mtorchiano/effsize/man/cliff.delta.html",
    },
    effectsize_interpret_eta_squared: {
        label: "rstatix: Kendall’s W uses Cohen-style cutoffs",
        url: "https://rpkgs.datanovia.com/rstatix/reference/friedman_effsize.html",
    },
    effectsize_interpret_kendalls_w: {
        label: "effectsize: default p-value labels",
        url: "https://www.rdocumentation.org/packages/effectsize/versions/1.0.0/topics/interpret_p",
    },
    pvalue_reporting: {
        label: "APA numbers and statistics guide",
        url: "https://apastyle.apa.org/instructional-aids/numbers-statistics-guide.pdf",
    },
    pvalue_caution: {
        label: "ASA statement on p-values",
        url: "https://www.amstat.org/asa/files/pdfs/p-valuestatement.pdf",
    },
    bayes_kass: {
        label: "Kass & Raftery Bayes-factor scale",
        url: "https://ptfonseca.github.io/pcal/reference/bfactor_interpret.html",
    },
    bayes_kass_pdf: {
        label: "Kass & Raftery (1995) PDF",
        url: "https://www.stat.washington.edu/raftery/Research/PDF/kass1995.pdf",
    },
    cramers_v_table: {
        label: "Cramér’s V table adapted from Cohen (1988)",
        url: "https://eprints.bournemouth.ac.uk/41425/9/table%20two%20effect%20size%20Cramers%20V.pdf",
    },
};

const scientific_interpretation_sources = {
    cohen_1988: {
        label: "Cohen (1988), Statistical Power Analysis for the Behavioral Sciences",
        kind: "primary",
    },
    cohen_1992: {
        label: "Cohen (1992), A power primer",
        kind: "primary",
    },
    field_2013: {
        label: "Field (2013), Discovering Statistics Using IBM SPSS Statistics",
        kind: "secondary",
    },
    effectsize_getting_started: {
        label: "effectsize getting-started guide",
        url: "https://easystats.github.io/effectsize/articles/effectsize.html",
        kind: "official_docs",
    },
    effectsize_interpret_r: {
        label: "effectsize::interpret_r",
        url: "https://easystats.github.io/effectsize/reference/interpret_r.html",
        kind: "official_docs",
    },
    effectsize_interpret_eta_squared: {
        label: "effectsize::interpret_eta_squared",
        url: "https://easystats.github.io/effectsize/reference/interpret_omega_squared.html",
        kind: "official_docs",
    },
    effectsize_interpret_kendalls_w: {
        label: "effectsize::interpret_kendalls_w",
        url: "https://easystats.github.io/effectsize/reference/interpret_kendalls_w.html",
        kind: "official_docs",
    },
    effectsize_interpret_p: {
        label: "effectsize::interpret_p",
        url: "https://easystats.github.io/effectsize/reference/interpret_p.html",
        kind: "official_docs",
    },
    effectsize_oddsratio: {
        label: "effectsize oddsratio reference",
        url: "https://easystats.github.io/effectsize/reference/oddsratio.html",
        kind: "official_docs",
    },
    romano_2006: {
        label: "Romano et al. (2006), Cliff's delta thresholds",
        kind: "primary",
    },
    landis_koch_1977: {
        label: "Landis & Koch (1977), agreement scale",
        kind: "primary",
    },
    apa_reporting: {
        label: "APA numbers and statistics guide",
        url: "https://apastyle.apa.org/instructional-aids/numbers-statistics-guide.pdf",
        kind: "society_guideline",
    },
    asa_pvalues: {
        label: "ASA statement on p-values",
        url: "https://www.amstat.org/asa/files/pdfs/p-valuestatement.pdf",
        kind: "society_guideline",
    },
    kass_raftery_1995: {
        label: "Kass & Raftery (1995), Bayes factors",
        url: "https://www.stat.washington.edu/raftery/Research/PDF/kass1995.pdf",
        kind: "primary",
    },
};

const effectInterpretationProfiles = {
    d_like: {
        kind: "magnitude",
        thresholds: [0.20, 0.50, 0.80],
        labels: ["negligible", "small", "medium", "large"],
        note: "Use the absolute value for the size label.",
        sources: [scientific_interpretation_sources.cohen_1988, scientific_interpretation_sources.effectsize_getting_started],
    },
    r_like: {
        kind: "magnitude",
        thresholds: [0.10, 0.30, 0.50],
        labels: ["negligible", "small", "medium", "large"],
        note: "Use the absolute value for the size label. This is a correlation-style heuristic.",
        sources: [scientific_interpretation_sources.cohen_1988, scientific_interpretation_sources.effectsize_interpret_r],
    },
    kendall_w_like: {
        kind: "magnitude",
        thresholds: [0.10, 0.30, 0.50],
        labels: ["negligible", "small", "medium", "large"],
        note: "Packages often use Cohen-style cutoffs for Kendall’s W in teaching contexts.",
        sources: [scientific_interpretation_sources.landis_koch_1977, scientific_interpretation_sources.effectsize_interpret_kendalls_w],
    },
    h_like: {
        kind: "magnitude",
        thresholds: [0.20, 0.50, 0.80],
        labels: ["negligible", "small", "medium", "large"],
        note: "Use the absolute value for the size label.",
        sources: [scientific_interpretation_sources.cohen_1988, scientific_interpretation_sources.effectsize_oddsratio],
    },
    f_like: {
        kind: "magnitude",
        thresholds: [0.10, 0.25, 0.40],
        labels: ["negligible", "small", "medium", "large"],
        sources: [scientific_interpretation_sources.cohen_1992],
    },
    f2_like: {
        kind: "magnitude",
        thresholds: [0.02, 0.15, 0.35],
        labels: ["negligible", "small", "medium", "large"],
        sources: [scientific_interpretation_sources.cohen_1988, scientific_interpretation_sources.effectsize_getting_started],
    },
    eta2_like: {
        kind: "magnitude",
        thresholds: [0.02, 0.13, 0.26],
        labels: ["negligible", "small", "medium", "large"],
        note: "Often used as a rough heuristic for η² or generalized η².",
        sources: [scientific_interpretation_sources.cohen_1992, scientific_interpretation_sources.effectsize_interpret_eta_squared],
    },
    partial_eta2_like: {
        kind: "magnitude",
        thresholds: [0.01, 0.06, 0.14],
        labels: ["negligible", "small", "medium", "large"],
        note: "Common teaching heuristic for partial η² and related ANOVA effect sizes.",
        sources: [scientific_interpretation_sources.field_2013, scientific_interpretation_sources.effectsize_interpret_eta_squared],
    },
    cliffs_delta_like: {
        kind: "magnitude",
        thresholds: [0.147, 0.330, 0.474],
        labels: ["negligible", "small", "medium", "large"],
        note: "Use the absolute value for the size label.",
        sources: [scientific_interpretation_sources.romano_2006, scientific_interpretation_sources.effectsize_getting_started],
    },
    correlation_like: {
        kind: "correlation_fit",
        thresholds: [0.10, 0.30, 0.50],
        labels: ["negligible", "weak", "moderate", "strong", "perfect"],
        note: "Use the absolute value for correlations or standardized slopes.",
        sources: [scientific_interpretation_sources.cohen_1988, scientific_interpretation_sources.effectsize_interpret_r],
    },
    r2_like: {
        kind: "correlation_fit",
        thresholds: [0.02, 0.13, 0.26],
        labels: ["negligible", "weak", "moderate", "strong", "perfect"],
        note: "R²-like measures run from 0 to 1. These cutoffs are Cohen-style heuristics for explained variance.",
        sources: [scientific_interpretation_sources.cohen_1988, scientific_interpretation_sources.effectsize_getting_started],
    },
    cramers_v: {
        kind: "cramers_v",
        labels: ["negligible", "weak", "moderate", "strong", "perfect"],
        rows: [
            { label: "df = 1", thresholds: [0.10, 0.30, 0.50] },
            { label: "df = 2", thresholds: [0.07, 0.21, 0.35] },
            { label: "df = 3", thresholds: [0.06, 0.17, 0.29] },
        ],
        note: "Choose the row that matches the smaller degrees of freedom of the table.",
        sources: [scientific_interpretation_sources.cohen_1988, scientific_interpretation_sources.effectsize_interpret_r],
    },
    phi_like: {
        kind: "correlation_fit",
        thresholds: [0.10, 0.30, 0.50],
        labels: ["negligible", "weak", "moderate", "strong", "perfect"],
        note: "For 2×2 tables, phi follows the same rough rules as Cramér’s V with df = 1.",
        sources: [scientific_interpretation_sources.cohen_1988, scientific_interpretation_sources.effectsize_interpret_r],
    },
};

function formatEffectCutoff(value) {
    if (value === 1) return "1.00";
    if (Math.abs(value) < 0.1) return Number(value).toFixed(2);
    if (Math.abs(value) < 1) return Number(value).toFixed(2);
    return String(value);
}

function formatEffectRangeTexts(profile) {
    if (!profile || !profile.thresholds) return [];
    const [a, b, c] = profile.thresholds;
    if (profile.kind === "correlation_fit") {
        return [
            `< ${formatEffectCutoff(a)}`,
            `${formatEffectCutoff(a)} to < ${formatEffectCutoff(b)}`,
            `${formatEffectCutoff(b)} to < ${formatEffectCutoff(c)}`,
            `${formatEffectCutoff(c)} to < 1.00`,
            `= 1.00`,
        ];
    }
    return [
        `< ${formatEffectCutoff(a)}`,
        `${formatEffectCutoff(a)} to < ${formatEffectCutoff(b)}`,
        `${formatEffectCutoff(b)} to < ${formatEffectCutoff(c)}`,
        `≥ ${formatEffectCutoff(c)}`,
    ];
}

function normalizeDisplayEffectName(effectName, sourceType = "row") {
    if (sourceType === "posthoc") return prettyEffectSize(effectName);
    return formatStats(effectName || "");
}

function mapEffectToInterpretation(effectName, sourceType = "row") {
    const label = normalizeDisplayEffectName(effectName, sourceType);
    const raw = String(effectName || "").toLowerCase();
    const displayRaw = String(label || "").toLowerCase();
    const joined = `${raw} ${displayRaw}`;

    if (joined.includes("cohen's d") || joined.includes("hedges") || joined.includes("cohen's dz") || joined.includes("gav")) {
        return { type: "profile", profile_id: "d_like", label };
    }
    if (joined.includes("cohen's h")) {
        return { type: "profile", profile_id: "h_like", label };
    }
    if (joined.includes("cliff")) {
        return { type: "profile", profile_id: "cliffs_delta_like", label };
    }
    if (joined.includes("kendall's w")) {
        return { type: "profile", profile_id: "kendall_w_like", label };
    }
    if (joined.includes("rank-biserial") || joined.includes("matched rank-biserial")) {
        return { type: "profile", profile_id: "r_like", label };
    }
    if ((joined.includes("cohen's f") || joined.includes("cohen’s f")) && !(joined.includes("f^2") || joined.includes("f²"))) {
        return { type: "profile", profile_id: "f_like", label };
    }
    if (joined.includes("f^2") || joined.includes("f²")) {
        return { type: "profile", profile_id: "f2_like", label };
    }
    if (joined.includes("partial eta") || joined.includes("partial η") || joined.includes("epsilon^2") || joined.includes("ε²") || joined.includes("eta^2(h)") || joined.includes("η²(h)")) {
        return { type: "profile", profile_id: "partial_eta2_like", label };
    }
    if (joined.includes("generalized eta") || joined.includes("omega") || joined.includes("eta^2") || joined.includes("η²")) {
        return { type: "profile", profile_id: "eta2_like", label };
    }
    if (joined.includes("cramer")) {
        return { type: "profile", profile_id: "cramers_v", label };
    }
    if (joined.includes("phi")) {
        return { type: "profile", profile_id: "phi_like", label };
    }
    if (
        joined.includes("pearson") ||
        joined.includes("spearman") ||
        joined.includes(" rho") ||
        joined.includes("τ") ||
        joined.includes(" tau") ||
        joined.includes("standardized beta") ||
        joined.includes("std. β") ||
        joined.includes("std β") ||
        joined.includes("semi-partial r") ||
        joined.includes("partial r")
    ) {
        return { type: "profile", profile_id: "correlation_like", label };
    }
    if (
        joined.includes("r^2") ||
        joined.includes("r²") ||
        joined.includes("pseudo-r") ||
        joined.includes("pseudo-r²") ||
        joined.includes("pseudo-r^2") ||
        joined.includes("marginal / conditional r")
    ) {
        return { type: "profile", profile_id: "r2_like", label };
    }
    if (joined.includes("mean difference") || joined.includes("model-based estimate") || joined.includes("estimate")) {
        return {
            type: "note",
            label,
            note: "No universal negligible/small/medium/large cutoffs exist for this value. Interpret it on the original outcome scale.",
        };
    }
    if (
        joined.includes("odds ratio") ||
        joined.includes("risk ratio") ||
        joined.includes("rate ratio") ||
        joined.includes("relative risk ratio")
    ) {
        return {
            type: "note",
            label,
            note: "No single universal negligible/small/medium/large standard is used for ratio measures. Interpret them relative to 1.00 and in the study context.",
        };
    }
    if (joined.includes("standardized residual")) {
        return {
            type: "note",
            label,
            note: "Standardized residuals are mainly used to locate cells that drive a table result. They do not have one universal four-step effect-size scale.",
        };
    }
    return {
        type: "note",
        label,
        note: "No shared interpretation table is stored for this measure yet.",
    };
}

function buildEffectInterpretationData(effectNames, sourceType = "row") {
    const grouped = new Map();
    const notes = [];
    (effectNames || []).forEach((effectName) => {
        const mapped = mapEffectToInterpretation(effectName, sourceType);
        if (!mapped || !mapped.label) return;
        if (mapped.type === "profile") {
            if (!grouped.has(mapped.profile_id)) {
                grouped.set(mapped.profile_id, {
                    profile_id: mapped.profile_id,
                    labels: [],
                });
            }
            const bucket = grouped.get(mapped.profile_id);
            if (!bucket.labels.includes(mapped.label)) bucket.labels.push(mapped.label);
        } else {
            notes.push(mapped);
        }
    });
    return {
        groups: Array.from(grouped.values()),
        notes,
    };
}

function createEffectInterpretationTable(profile) {
    const table = document.createElement("table");
    table.className = "effect-interpret-table";

    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    ["Range / Value", "How to read it"].forEach((label) => {
        const th = document.createElement("th");
        th.textContent = label;
        headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    if (profile.kind === "cramers_v") {
        (profile.rows || []).forEach((row) => {
            const [a, b, c] = row.thresholds;
            [
                [`${row.label}: < ${formatEffectCutoff(a)}`, profile.labels[0]],
                [`${row.label}: ${formatEffectCutoff(a)} to < ${formatEffectCutoff(b)}`, profile.labels[1]],
                [`${row.label}: ${formatEffectCutoff(b)} to < ${formatEffectCutoff(c)}`, profile.labels[2]],
                [`${row.label}: ${formatEffectCutoff(c)} to < 1.00`, profile.labels[3]],
                [`${row.label}: = 1.00`, profile.labels[4]],
            ].forEach((pair) => {
                const tr = document.createElement("tr");
                pair.forEach((value) => {
                    const td = document.createElement("td");
                    td.textContent = value;
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });
        });
        table.appendChild(tbody);
        return table;
    }

    const ranges = formatEffectRangeTexts(profile);
    ranges.forEach((range, index) => {
        const tr = document.createElement("tr");
        [range, profile.labels[index]].forEach((value) => {
            const td = document.createElement("td");
            td.textContent = value;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
}

function renderEffectInterpretationSection(effectNames, sourceType = "row") {
    const data = buildEffectInterpretationData(effectNames, sourceType);
    const wrap = document.createElement("div");
    wrap.className = "effect-interpret-grid";

    data.groups.forEach((group) => {
        const profile = effectInterpretationProfiles[group.profile_id];
        if (!profile) return;
        const card = document.createElement("div");
        card.className = "effect-interpret-card";

        const title = document.createElement("h4");
        title.textContent = group.labels.join(" / ");
        card.appendChild(title);

        const lead = document.createElement("p");
        lead.textContent = "Common benchmark values";
        card.appendChild(lead);
        card.appendChild(createEffectInterpretationTable(profile));

        if (profile.note) {
            const note = document.createElement("div");
            note.className = "effect-interpret-note";
            note.textContent = profile.note;
            card.appendChild(note);
        }

        const sourceEl = createInterpretationSources(profile.sources || []);
        if (sourceEl) card.appendChild(sourceEl);
        wrap.appendChild(card);
    });

    data.notes.forEach((entry) => {
        const card = document.createElement("div");
        card.className = "effect-interpret-card";
        const title = document.createElement("h4");
        title.textContent = entry.label;
        card.appendChild(title);
        const note = document.createElement("p");
        note.textContent = entry.note;
        card.appendChild(note);
        wrap.appendChild(card);
    });

    return wrap.children.length ? wrap : null;
}

function renderEffectSizeBlock(effectNames, sourceType = "row", introText = "") {
    const block = document.createElement("div");
    if (introText) {
        const intro = document.createElement("p");
        intro.className = "effect-summary-text";
        intro.textContent = introText;
        block.appendChild(intro);
    }

    const cleanNames = (effectNames || []).map((item) => normalizeDisplayEffectName(item, sourceType)).filter(Boolean);
    if (cleanNames.length) {
        const summary = document.createElement("p");
        summary.className = "effect-summary-text";
        summary.innerHTML = `<strong>Shown here:</strong> ${escapeHtml(cleanNames.join(", "))}`;
        block.appendChild(summary);
    }

    const section = renderEffectInterpretationSection(effectNames, sourceType);
    if (section) block.appendChild(section);
    return block;
}

function getRowStateKey(row) {
    return row && row.internal_key ? row.internal_key : row.id;
}

function createEffectNameList(effectNames, sourceType = "row") {
    const wrap = document.createElement("div");
    wrap.className = "effect-name-list";
    if ((effectNames || []).length === 1 && isEffectNote(effectNames[0])) {
        const note = document.createElement("div");
        note.className = "legacy-note";
        note.textContent = normalizeDisplayEffectName(effectNames[0], sourceType);
        wrap.appendChild(note);
        return wrap;
    }
    (effectNames || []).forEach((name) => {
        const badge = document.createElement("span");
        badge.className = "badge";
        badge.textContent = normalizeDisplayEffectName(name, sourceType);
        wrap.appendChild(badge);
    });
    return wrap;
}

function getEstimateScaleInterpretation(scale) {
    if (scale === "difference") {
        return {
            title: "Estimate scale",
            lead: "Differences are read on the original outcome scale.",
            headers: ["Range / Value", "How to read it"],
            rows: [["0", "no difference"], ["> 0", "higher value in the first condition or contrast"], ["< 0", "lower value in the first condition or contrast"]],
            note: "Always interpret the size on the original scale of the dependent variable.",
        };
    }
    if (scale === "odds_ratio") {
        return {
            title: "Estimate scale",
            lead: "Odds ratios are centered around 1.00.",
            headers: ["Range / Value", "How to read it"],
            rows: [["1.00", "no difference in odds"], ["> 1.00", "higher odds"], ["< 1.00", "lower odds"]],
            note: "Interpret the practical size in context. No single universal negligible/small/medium/large rule is used for odds ratios.",
        };
    }
    if (scale === "rate_ratio") {
        return {
            title: "Estimate scale",
            lead: "Rate ratios are centered around 1.00.",
            headers: ["Range / Value", "How to read it"],
            rows: [["1.00", "no difference in rate"], ["> 1.00", "higher rate"], ["< 1.00", "lower rate"]],
            note: "Interpret the practical size in context. No single universal negligible/small/medium/large rule is used for rate ratios.",
        };
    }
    if (scale === "relative_risk_ratio") {
        return {
            title: "Estimate scale",
            lead: "Relative risk ratios are centered around 1.00.",
            headers: ["Range / Value", "How to read it"],
            rows: [["1.00", "no difference in relative risk"], ["> 1.00", "higher relative risk"], ["< 1.00", "lower relative risk"]],
            note: "Interpret the practical size in context. No single universal negligible/small/medium/large rule is used for ratio measures.",
        };
    }
    if (scale === "rank_difference" || scale === "paired_rank_difference") {
        return {
            title: "Estimate scale",
            lead: "Rank-based contrasts are read as direction and size of the rank difference.",
            headers: ["Range / Value", "How to read it"],
            rows: [["0", "no rank difference"], ["> 0", "higher ranks in the first condition or contrast"], ["< 0", "lower ranks in the first condition or contrast"]],
            note: "Use the matching rank-based effect size for magnitude.",
        };
    }
    if (scale === "table_localization") {
        return {
            title: "Estimate scale",
            lead: "Cellwise localization values are used to find the cells that drive the table result.",
            headers: ["Range / Value", "How to read it"],
            rows: [["0", "close to the expected count"], ["> 0", "observed count is higher than expected"], ["< 0", "observed count is lower than expected"]],
            note: "Standardized residuals do not have one universal four-step effect-size scale.",
        };
    }
    return null;
}

function renderInterpretationPanel(options = {}) {
    const {
        effectNames = [],
        sourceType = "row",
        includeBayes = false,
        estimateScale = "",
        rowId = "",
        testName = "",
        procedureId = "",
    } = options;

    const panel = document.createElement("div");
    panel.className = "interpretation-panel";
    panel.innerHTML = '<p>Use these tables and visual examples as quick reporting help. They do not replace subject-matter interpretation.</p>';

    const grid = document.createElement("div");
    grid.className = "effect-interpret-grid";

    grid.appendChild(
        createInterpretationCard(
            "p values",
            "Common reporting cutoffs for frequentist results.",
            ["Range / Value", "How to read it"],
            [
                ["p < .001", "commonly reported as very strong incompatibility with H0 under the fitted model"],
                [".001 ≤ p < .01", "commonly read as strong incompatibility with H0"],
                [".01 ≤ p < .05", "commonly read as statistically significant under a .05 rule"],
                ["p ≥ .05", "not enough evidence to reject H0 under a .05 rule"],
            ],
            "Report exact p values when possible. A p value is not an effect size.",
            [scientific_interpretation_sources.effectsize_interpret_p, scientific_interpretation_sources.apa_reporting, scientific_interpretation_sources.asa_pvalues],
        )
    );

    const scaleInfo = getEstimateScaleInterpretation(estimateScale);
    if (scaleInfo) {
        grid.appendChild(createInterpretationCard(scaleInfo.title, scaleInfo.lead, scaleInfo.headers, scaleInfo.rows, scaleInfo.note));
    }

    const confidenceIntervalCard = createConfidenceIntervalExamplesCard({
        estimateScale,
        sourceType,
        rowId,
        testName,
        procedureId,
    });
    if (confidenceIntervalCard) {
        grid.appendChild(confidenceIntervalCard);
    }

    const effectSection = renderEffectInterpretationSection(effectNames, sourceType);
    if (effectSection) {
        Array.from(effectSection.children).forEach((child) => grid.appendChild(child));
    }

    if (includeBayes) {
        grid.appendChild(
            createInterpretationCard(
                "Bayes factors",
                "Common labels for BF10. For support of H0, read the reciprocal BF01 in the same way.",
                ["Range / Value", "How to read it"],
                [
                    ["> 150", "BF10", "very strong support for H1"],
                    ["20 to < 150", "BF10", "strong support for H1"],
                    ["3 to < 20", "BF10", "positive support for H1"],
                    ["1 to < 3", "BF10", "weak support for H1"],
                    ["= 1", "BF10", "equal support"],
                    ["1/3 to < 1", "BF10", "weak support for H0"],
                    ["1/20 to < 1/3", "BF10", "positive support for H0"],
                    ["1/150 to < 1/20", "BF10", "strong support for H0"],
                    ["< 1/150", "BF10", "very strong support for H0"],
                ],
                "Use one direction consistently: either BF10 or BF01.",
                [scientific_interpretation_sources.kass_raftery_1995],
            )
        );
    }

    panel.appendChild(grid);
    const wrapper = document.createElement("div");
    wrapper.className = "accordion app-accordion";
    wrapper.appendChild(createAccordionItem("Interpretation", panel));
    return wrapper;
}

function getVisiblePosthocProcedures(row) {

    if (!row.posthoc || !row.posthoc.available) return [];
    return (row.posthoc.procedures || []).filter(
        (procedure) => procedure.ui_enabled !== false,
    );
}

function getProcedureById(row, procedureId) {
    return getVisiblePosthocProcedures(row).find(
        (procedure) => procedure.id === procedureId,
    );
}

function getProcedureFamilyMeta(procedure) {
    if (!procedure) return null;
    return posthoc_families[procedure.family_type] || null;
}

function getProcedureAvailability(row, procedure) {
    const reasons = [];
    if (!procedure) {
        reasons.push("No procedure selected.");
    }
    if (
        procedure &&
        procedure.control_level_required &&
        !norm(row.control_level)
    ) {
        reasons.push("Requires a declared control_level.");
    }
    if (
        procedure &&
        procedure.id === "ph_model_pairwise_emmeans" &&
        !row.supports_emmeans
    ) {
        reasons.push("This model row is not flagged as emmeans-capable.");
    }
    if (
        procedure &&
        procedure.id === "ph_model_custom_contrasts" &&
        !row.supports_custom_contrasts
    ) {
        reasons.push("This model row is not flagged for custom contrasts.");
    }
    if (
        procedure &&
        procedure.id === "ph_a05_tukey_hsd" &&
        norm(row.route).toLowerCase().includes("hetero")
    ) {
        reasons.push("Tukey is not the heteroskedastic route.");
    }
    return {
        enabled: reasons.length === 0,
        reasons,
    };
}

function getAllowedAdjustMethods(procedure) {
    if (!procedure) return [];
    const familyMeta = getProcedureFamilyMeta(procedure);
    const procedureAllowed = uniqueNonEmpty(
        (procedure.multiplicity && procedure.multiplicity.allowed) || [],
    );
    const familyAllowed = uniqueNonEmpty(
        (familyMeta && familyMeta.adjust_method_allowed) || [],
    );
    if (!procedureAllowed.length) return familyAllowed;
    if (!familyAllowed.length) return procedureAllowed;
    const overlap = procedureAllowed.filter((method) =>
        familyAllowed.includes(method),
    );
    return overlap.length ? overlap : procedureAllowed;
}

function getDefaultAdjustMethod(procedure) {
    if (!procedure) return null;
    const allowed = getAllowedAdjustMethods(procedure);
    if (
        procedure.multiplicity &&
        allowed.includes(procedure.multiplicity.default)
    ) {
        return procedure.multiplicity.default;
    }
    const familyMeta = getProcedureFamilyMeta(procedure);
    if (
        familyMeta &&
        allowed.includes(familyMeta.adjust_method_default)
    ) {
        return familyMeta.adjust_method_default;
    }
    return allowed[0] || null;
}

function chooseDefaultProcedure(row) {
    const visible = getVisiblePosthocProcedures(row);
    if (!visible.length) return null;

    const preferredIds = [];
    if (row.id === "A05") {
        if (norm(row.control_level)) preferredIds.push("ph_a05_dunnett");
        if (norm(row.route).toLowerCase().includes("hetero")) {
            preferredIds.push("ph_a05_games_howell");
        }
        preferredIds.push("ph_a05_tukey_hsd");
        preferredIds.push("ph_model_pairwise_emmeans");
    } else if (row.id === "A07") {
        preferredIds.push("ph_a07_dunn");
    } else if (row.id === "A08") {
        preferredIds.push("ph_a08_pairwise_wilcoxon");
    } else if (row.id === "D01") {
        preferredIds.push("ph_d01_adjusted_residuals");
        preferredIds.push("ph_d01_pairwise_prop_test");
    } else {
        preferredIds.push(
            "ph_model_simple_effects",
            "ph_model_pairwise_emmeans",
            "ph_model_interaction_slices",
            "ph_model_treatment_vs_control",
            "ph_model_custom_contrasts",
        );
    }

    for (const procedureId of preferredIds) {
        const candidate = visible.find(
            (procedure) => procedure.id === procedureId,
        );
        if (
            candidate &&
            getProcedureAvailability(row, candidate).enabled
        ) {
            return candidate;
        }
    }

    return (
        visible.find(
            (procedure) =>
                getProcedureAvailability(row, procedure).enabled,
        ) || visible[0]
    );
}

function getPosthocState(row) {
    const stateKey = getRowStateKey(row);
    if (!posthocSelectionState[stateKey]) {
        const defaultProcedure = chooseDefaultProcedure(row);
        posthocSelectionState[stateKey] = {
            procedure_id: defaultProcedure ? defaultProcedure.id : null,
            adjust_method: defaultProcedure
                ? getDefaultAdjustMethod(defaultProcedure)
                : null,
        };
    }

    const state = posthocSelectionState[stateKey];
    const selectedProcedure = getProcedureById(row, state.procedure_id);
    if (
        !selectedProcedure ||
        !getProcedureAvailability(row, selectedProcedure).enabled
    ) {
        const fallbackProcedure = chooseDefaultProcedure(row);
        state.procedure_id = fallbackProcedure
            ? fallbackProcedure.id
            : null;
    }

    const activeProcedure = getProcedureById(row, state.procedure_id);
    const allowedAdjustMethods = getAllowedAdjustMethods(activeProcedure);
    if (!allowedAdjustMethods.includes(state.adjust_method)) {
        state.adjust_method = getDefaultAdjustMethod(activeProcedure);
    }

    return state;
}

function setPosthocProcedure(row, procedureId) {
    const stateKey = getRowStateKey(row);
    const procedure = getProcedureById(row, procedureId);
    if (!procedure) return;
    if (!getProcedureAvailability(row, procedure).enabled) return;
    posthocSelectionState[stateKey] = {
        procedure_id: procedure.id,
        adjust_method: getDefaultAdjustMethod(procedure),
    };
    render();
}

function setPosthocAdjustMethod(row, adjustMethod) {
    const stateKey = getRowStateKey(row);
    const procedure = getProcedureById(
        row,
        getPosthocState(row).procedure_id,
    );
    if (!procedure) return;
    const allowed = getAllowedAdjustMethods(procedure);
    if (!allowed.includes(adjustMethod)) return;
    posthocSelectionState[stateKey] = {
        procedure_id: procedure.id,
        adjust_method: adjustMethod,
    };
    render();
}

function createChoiceChip(label, opts = {}) {
    const button = document.createElement("button");
    button.className =
        "choice-chip" +
        (opts.selected ? " selected" : "") +
        (opts.disabled ? " disabled" : "");
    button.textContent = label;
    button.type = "button";
    if (opts.title) button.title = opts.title;
    if (opts.disabled) button.disabled = true;
    if (typeof opts.onClick === "function" && !opts.disabled) {
        button.addEventListener("click", opts.onClick);
    }
    return button;
}

function createMetaItem(label, value) {
    const item = document.createElement("div");
    item.className = "meta-item";
    item.innerHTML =
        '<div class="meta-label">' +
        escapeHtml(label) +
        '</div><div class="meta-value">' +
        escapeHtml(value || "—") +
        "</div>";
    return item;
}

function usesAsymptoticInference(row) {
    return [
        "glm_binomial",
        "glm_count",
        "ordinal_regression",
        "multinomial_logit",
        "correlated_logistic",
        "correlated_count",
        "contingency_table",
    ].includes(row.model_class);
}

function previewContrastLabel(row, procedure) {
    if (!procedure) return "contrast";
    if (procedure.family_type === "many_to_one") {
        return "treatment − control";
    }
    if (procedure.family_type === "simple_effects") {
        return "simple effect contrast";
    }
    if (procedure.id === "ph_model_interaction_slices") {
        return "interaction slice contrast";
    }
    if (procedure.id === "ph_d01_adjusted_residuals") {
        return "cell residual";
    }
    if (procedure.id === "ph_model_custom_contrasts") {
        return "custom contrast";
    }
    return "pairwise contrast";
}

function previewEstimateValue(row, procedure) {
    if (!procedure) return "estimate";
    if (procedure.id === "ph_d01_adjusted_residuals") {
        return "adjusted residual";
    }
    if (row.estimate_scale === "difference") {
        return "Δ estimate";
    }
    if (row.estimate_scale === "odds_ratio") {
        return "OR";
    }
    if (row.estimate_scale === "rate_ratio") {
        return "RR";
    }
    if (row.estimate_scale === "relative_risk_ratio") {
        return "RRR";
    }
    if (
        row.estimate_scale === "rank_difference" ||
        row.estimate_scale === "paired_rank_difference"
    ) {
        return "rank contrast";
    }
    return "estimate";
}

function previewStatisticValue(row, procedure) {
    if (!procedure) return "stat";
    if (procedure.id === "ph_d01_adjusted_residuals") {
        return "z";
    }
    if (
        row.model_class === "rank_oneway" ||
        row.model_class === "rank_repeated"
    ) {
        return "z / W";
    }
    if (usesAsymptoticInference(row)) {
        return "z";
    }
    return "t";
}

function previewGroupValue(row, side, procedure) {
    const target = row.target_factor || "factor";
    if (procedure && procedure.id === "ph_d01_adjusted_residuals") {
        return side === 1 ? "row level" : "column level";
    }
    if (procedure && procedure.family_type === "custom") {
        return side === 1 ? "contrast lhs" : "contrast rhs";
    }
    if (procedure && procedure.family_type === "many_to_one") {
        if (side === 2) return row.control_level || "control";
        return target + " level";
    }
    return side === 1
        ? target + " level A"
        : target + " level B";
}

function previewEffectName(row, procedure) {
    const effects = procedure ? procedure.effect_sizes || [] : [];
    return prettyEffectSize(effects[0] || "estimate");
}

function previewEffectValue(row, procedure) {
    if (!procedure) return "effect";
    const first = (procedure.effect_sizes || [])[0];
    if (first === "mean_diff") return "Δ";
    if (first === "cohens_d") return "d";
    if (first === "hedges_g") return "g";
    if (first === "odds_ratio") return "OR";
    if (first === "rate_ratio") return "RR";
    if (first === "relative_risk_ratio") return "RRR";
    if (first === "rank_biserial") return "r_rb";
    if (first === "matched_rank_biserial") return "r_rb(paired)";
    if (first === "cliffs_delta") return "δ";
    if (first === "standardized_residual") return "z_resid";
    if (first === "cramers_v") return "V";
    if (first === "cohens_h") return "h";
    return "effect";
}

function buildContrastPreviewRow(row, procedure, adjustMethod) {
    return {
        contrast_label: previewContrastLabel(row, procedure),
        group1: previewGroupValue(row, 1, procedure),
        group2: previewGroupValue(row, 2, procedure),
        estimate: previewEstimateValue(row, procedure),
        SE: "SE(estimate)",
        df: usesAsymptoticInference(row) ? "asymptotic" : "df",
        statistic: previewStatisticValue(row, procedure),
        p_raw: "p_raw",
        p_adj: "p_adj (" + prettyAdjustMethod(adjustMethod) + ")",
        conf_low: "CI low",
        conf_high: "CI high",
        effect_name: previewEffectName(row, procedure),
        effect_value: previewEffectValue(row, procedure),
    };
}

function renderContrastOutputTable(row, procedure, adjustMethod) {
    const wrap = document.createElement("div");
    wrap.className = "table-wrap";
    const table = document.createElement("table");
    table.className = "contrast-table";
    const header = document.createElement("thead");
    const headerRow = document.createElement("tr");
    (procedure.output_fields || []).forEach((fieldKey) => {
        const fieldMeta =
            posthoc_output_schema.fields[fieldKey] || {
                title: fieldKey,
            };
        const th = document.createElement("th");
        th.textContent = fieldMeta.title || fieldKey;
        headerRow.appendChild(th);
    });
    header.appendChild(headerRow);
    table.appendChild(header);

    const body = document.createElement("tbody");
    const previewRow = buildContrastPreviewRow(
        row,
        procedure,
        adjustMethod,
    );
    const tr = document.createElement("tr");
    (procedure.output_fields || []).forEach((fieldKey) => {
        const td = document.createElement("td");
        td.textContent = previewRow[fieldKey] || "—";
        tr.appendChild(td);
    });
    body.appendChild(tr);
    table.appendChild(body);
    wrap.appendChild(table);
    return wrap;
}

function simpleFamilyText(procedure) {
    if (!procedure) return "";
    if (procedure.family_type === "all_pairs") {
        return "Compares all groups with each other.";
    }
    if (procedure.family_type === "many_to_one") {
        return "Compares each group with one control group.";
    }
    if (procedure.family_type === "simple_effects") {
        return "Compares one factor inside each level of another factor.";
    }
    if (procedure.family_type === "pairwise_by_factor") {
        return "Runs pairwise comparisons within the selected factor.";
    }
    if (procedure.family_type === "trend") {
        return "Checks ordered trends instead of all pairwise differences.";
    }
    return "Runs a custom set of follow-up contrasts.";
}

function simpleProcedureText(row, procedure) {
    if (!procedure) return "";
    const target = row.target_factor || procedure.target_term || "group";
    const control = row.control_level || "control";
    switch (procedure.id) {
        case "ph_a05_tukey_hsd":
            return "Best for one-way ANOVA when you want all group pairs and the variances are similar.";
        case "ph_a05_games_howell":
            return "Best for one-way ANOVA when you want all group pairs and the variances are not similar.";
        case "ph_a05_dunnett":
            return "Compares every group with the control group '" + control + "'.";
        case "ph_a07_dunn":
            return "Standard follow-up after Kruskal-Wallis for pairwise rank-based comparisons.";
        case "ph_a08_pairwise_wilcoxon":
            return "Standard follow-up after Friedman for paired pairwise comparisons.";
        case "ph_d01_pairwise_prop_test":
            return "Compares proportions pairwise for smaller table margins such as 2×C or C×2.";
        case "ph_d01_pairwise_fisher":
            return "Uses exact pairwise tests for small or sparse contingency tables.";
        case "ph_d01_adjusted_residuals":
            return "Shows which cells contribute most to the chi-square result.";
        case "ph_model_pairwise_emmeans":
            return "Uses the fitted model to compare estimated means, probabilities, or rates for '" + target + "'.";
        case "ph_model_simple_effects":
            return "Uses the fitted model to compare '" + target + "' inside levels of another factor.";
        case "ph_model_interaction_slices":
            return "Uses the fitted model to break down an interaction step by step.";
        case "ph_model_treatment_vs_control":
            return "Uses the fitted model to compare each level with the control group '" + control + "'.";
        case "ph_model_custom_contrasts":
            return "Uses the fitted model for user-defined contrasts.";
        case "ph_model_trend_tests":
            return "Uses the fitted model to test ordered trends.";
        default:
            return simpleFamilyText(procedure);
    }
}

function getPosthocMethodGuidance(row, procedure) {
    if (!procedure) return "";
    const target = row.target_factor || procedure.target_term || "group";
    const control = row.control_level || "control";
    switch (procedure.id) {
        case "ph_a05_tukey_hsd":
            return "Choose Tukey when you want every group pair after a one-way ANOVA and the equal-variance route is acceptable. It is a standard all-pairs method for mean comparisons and keeps the family-wise error rate under control for this one comparison family.";
        case "ph_a05_games_howell":
            return "Choose Games-Howell when you still want every group pair, but the groups do not have similar variances or sample sizes. It is the safer all-pairs choice for a heteroskedastic one-way design.";
        case "ph_a05_dunnett":
            return "Choose Dunnett when one level is a real control group and every other group should be compared with that control. It is more focused and usually more powerful than running all pairwise comparisons when the research question is many-to-one.";
        case "ph_a07_dunn":
            return "Choose Dunn after Kruskal-Wallis when you need rank-based pairwise follow-up tests. It is the standard option for independent groups because it keeps the nonparametric rank logic of the omnibus test.";
        case "ph_a08_pairwise_wilcoxon":
            return "Choose pairwise Wilcoxon signed-rank tests after Friedman when you want paired follow-up comparisons between conditions. Use it when the design is within-subjects and you need a simple, standard follow-up method.";
        case "ph_d01_pairwise_prop_test":
            return "Choose pairwise proportion tests when the table can be broken into pairwise proportion comparisons, typically in 2×C or C×2 settings with enough counts for normal approximations. This is useful when the question is which proportions differ from each other.";
        case "ph_d01_pairwise_fisher":
            return "Choose pairwise Fisher tests when the pairwise subtables are small or sparse and an exact method is safer than a large-sample approximation. This is the better choice when expected counts are low.";
        case "ph_d01_adjusted_residuals":
            return "Choose adjusted residuals when the main goal is to localize which cells drive the overall chi-square result in a larger contingency table. This does not compare all row-column pairs as separate effect estimates; it highlights cells that are above or below expectation.";
        case "ph_model_pairwise_emmeans":
            return "Choose pairwise estimated marginal means when you want model-based comparisons for '" + target + "' and there is no interaction that needs a more local follow-up. This is a good default for ANOVA, ANCOVA, mixed, and generalized models because it follows the fitted model instead of raw means.";
        case "ph_model_simple_effects":
            return "Choose simple effects when an interaction matters and you want to compare '" + target + "' inside levels of another factor. This is usually better than one global pairwise comparison because it respects the interaction structure in the model.";
        case "ph_model_interaction_slices":
            return "Choose interaction slices when you want to break down an interaction step by step and inspect one slice at a time. This is especially useful when the model has several factors and you want a structured follow-up instead of a long list of raw pairwise contrasts.";
        case "ph_model_treatment_vs_control":
            return "Choose treatment-versus-control contrasts when the fitted model should compare each level with the control group '" + control + "'. Use this when the design has a meaningful baseline or control condition and all-pairs comparisons would answer a broader question than necessary.";
        case "ph_model_custom_contrasts":
            return "Choose custom contrasts when your hypothesis is planned and cannot be expressed well as all-pairs or simple treatment-versus-control comparisons. This is the most flexible option, but it requires that the contrast weights reflect the research question clearly.";
        case "ph_model_trend_tests":
            return "Choose trend tests when the factor levels are ordered and the main question is whether there is a linear or higher-order pattern across levels. Use this for ordered doses, intensities, or time points instead of treating every pair as unrelated.";
        default:
            return simpleFamilyText(procedure);
    }
}

function getAdjustMethodGuidance(row, procedure, method) {
    if (!procedure || !method) return "";
    switch (method) {
        case "holm":
            return "Holm is the default general-purpose choice when you want strong family-wise error control without being as conservative as Bonferroni. It is a good standard option for many pairwise and simple-effect follow-up families.";
        case "bonferroni":
            return "Bonferroni is simple and very strict. Choose it when you want a very conservative correction and the number of follow-up tests is small, or when you want an easy-to-explain upper-bound approach for family-wise error control.";
        case "BH":
            return "Benjamini-Hochberg controls the false discovery rate instead of the family-wise error rate. Choose it when you expect many comparisons and want a less conservative screen, but only when FDR control is acceptable for the study.";
        case "BY":
            return "Benjamini-Yekutieli is a more conservative false-discovery-rate correction that remains valid under broader dependence structures. Use it when you need FDR control but want a safer correction than Benjamini-Hochberg.";
        case "tukey":
            return "Tukey is tailored to all-pairs mean comparisons in one-factor Gaussian models. Choose it only when the method itself is an all-pairs mean-comparison family; it is not a generic correction for every post-hoc setting.";
        case "dunnett":
            return "Dunnett is tailored to many-to-one comparisons against a control group. Choose it only when each contrast compares one treatment with the same control and that control has been defined clearly.";
        case "mvt":
            return "Multivariate t adjustment is an advanced model-based option that can be useful for correlated contrast sets from fitted models. Choose it when you need a model-based multiplicity correction beyond the simpler defaults and the model supports it well.";
        case "games-howell":
            return "Games-Howell already builds the heteroskedastic pairwise logic into the method. Use this only in that specific one-way all-pairs setting rather than as a general p-value correction.";
        case "nemenyi":
            return "Nemenyi is mainly tied to nonparametric all-pairs rank comparisons after omnibus rank tests. Use it only when that specific rank-based family is the intended method.";
        default:
            return "Choose a correction that matches the selected contrast family. Prefer method-specific corrections when the family has a dedicated standard, otherwise use Holm as the safe general default.";
    }
}

function getPosthocCodeContext(row, procedure) {
    const target = row.target_factor || procedure.target_term || "group";
    const rawBy = uniqueNonEmpty(
        (procedure && procedure.by_factors) || [],
    );
    const byFactors = rawBy.length
        ? rawBy
        : procedure && (procedure.family_type === "simple_effects" || procedure.id === "ph_model_interaction_slices")
            ? ["other_factor"]
            : [];
    return {
        target,
        byFactors,
        byText: byFactors.length ? byFactors.join(" * ") : "other_factor",
        control: row.control_level || "control",
    };
}

function getPosthocRCode(row, procedure, adjustMethod) {
    const ctx = getPosthocCodeContext(row, procedure);
    switch (procedure.id) {
        case "ph_a05_tukey_hsd":
            return `fit <- lm(y ~ group, data = df)
emm <- emmeans::emmeans(fit, ~ group)
pairs(emm, adjust = "tukey")`;
        case "ph_a05_games_howell":
            return `rstatix::games_howell_test(df, y ~ group)`;
        case "ph_a05_dunnett":
            return `fit <- lm(y ~ group, data = df)
emm <- emmeans::emmeans(fit, ~ group)
emmeans::contrast(emm, method = "trt.vs.ctrl", ref = "${ctx.control}", adjust = "dunnett")`;
        case "ph_a07_dunn":
            return `rstatix::dunn_test(df, y ~ group, p.adjust.method = "${adjustMethod}")`;
        case "ph_a08_pairwise_wilcoxon":
            return `rstatix::pairwise_wilcox_test(
  df,
  y ~ condition,
  paired = TRUE,
  p.adjust.method = "${adjustMethod}"
)`;
        case "ph_d01_pairwise_prop_test":
            return `tab <- table(df$dv, df$iv)  # assumes a binary outcome by group
success <- tab[1, ]
n <- colSums(tab)
pairwise.prop.test(success, n, p.adjust.method = "${adjustMethod}")`;
        case "ph_d01_pairwise_fisher":
            return `tab <- table(df$dv, df$iv)
rcompanion::pairwiseNominalIndependence(
  tab,
  fisher = TRUE,
  method = "${adjustMethod}"
)`;
        case "ph_d01_adjusted_residuals":
            return `tab <- table(df$dv, df$iv)
out <- chisq.test(tab)
out$stdres`;
        case "ph_model_pairwise_emmeans":
            return `# Requires the fitted primary model saved as \`fit\`
library(emmeans)
emm <- emmeans::emmeans(fit, ~ ${ctx.target})
pairs(emm, adjust = "${adjustMethod}")`;
        case "ph_model_simple_effects":
            return `# Requires the fitted primary model saved as \`fit\`
library(emmeans)
emm <- emmeans::emmeans(fit, ~ ${ctx.target} | ${ctx.byText})
pairs(emm, adjust = "${adjustMethod}")`;
        case "ph_model_interaction_slices":
            return `# Requires the fitted primary model saved as \`fit\`
library(emmeans)
emm <- emmeans::emmeans(fit, ~ ${ctx.target} | ${ctx.byText})
pairs(emm, adjust = "${adjustMethod}")`;
        case "ph_model_treatment_vs_control":
            return `# Requires the fitted primary model saved as \`fit\`
library(emmeans)
emm <- emmeans::emmeans(fit, ~ ${ctx.target})
emmeans::contrast(emm, method = "trt.vs.ctrl", ref = "${ctx.control}", adjust = "${adjustMethod}")`;
        case "ph_model_custom_contrasts":
            return `# Requires the fitted primary model saved as \`fit\`
library(emmeans)
emm <- emmeans::emmeans(fit, ~ ${ctx.target})
emmeans::contrast(
  emm,
  method = list("A - B" = c(1, -1, 0)),
  adjust = "${adjustMethod}"
)`;
        case "ph_model_trend_tests":
            return `# ordered factor needed
emm <- emmeans::emmeans(fit, ~ ${ctx.target})
emmeans::contrast(emm, method = "poly", adjust = "${adjustMethod}")`;
        default:
            return `# fit = primary model
# add the post-hoc procedure that matches your selected option`;
    }
}

function getPosthocPythonCode(row, procedure, adjustMethod) {
    const ctx = getPosthocCodeContext(row, procedure);
    switch (procedure.id) {
        case "ph_a05_tukey_hsd":
            return `from statsmodels.stats.multicomp import pairwise_tukeyhsd

pairwise_tukeyhsd(endog=df["y"], groups=df["group"])`;
        case "ph_a05_games_howell":
            return `import pingouin as pg

pg.pairwise_gameshowell(data=df, dv="y", between="group")`;
        case "ph_a05_dunnett":
            return `from scipy.stats import dunnett

control = df.loc[df["group"] == "${ctx.control}", "y"]
treatments = [
    df.loc[df["group"] == g, "y"]
    for g in df["group"].dropna().unique()
    if g != "${ctx.control}"
]

dunnett(*treatments, control=control)`;
        case "ph_a07_dunn":
            return `import scikit_posthocs as sp

sp.posthoc_dunn(df, val_col="y", group_col="group", p_adjust="${statsmodelsAdjustMethod(adjustMethod)}")`;
        case "ph_a08_pairwise_wilcoxon":
            return `import pingouin as pg

pg.pairwise_tests(
    data=df,
    dv="y",
    within="condition",
    subject="subject",
    parametric=False,
    padjust="${pingouinAdjustMethod(adjustMethod)}"
)`;
        case "ph_d01_pairwise_prop_test":
            return `import itertools
import pandas as pd
from statsmodels.stats.proportion import proportions_ztest
from statsmodels.stats.multitest import multipletests

tab = pd.crosstab(df["dv"], df["iv"])  # assumes a binary outcome by group
success_label = tab.index[0]  # replace with the event level you want to compare
results = []

for left, right in itertools.combinations(tab.columns, 2):
    count = [tab.loc[success_label, left], tab.loc[success_label, right]]
    nobs = [tab[left].sum(), tab[right].sum()]
    stat, p_value = proportions_ztest(count=count, nobs=nobs)
    results.append({"contrast": f"{left} vs {right}", "p_raw": p_value})

results = pd.DataFrame(results)
results["p_adj"] = multipletests(results["p_raw"], method="${statsmodelsAdjustMethod(adjustMethod)}")[1]
print(results)`;
        case "ph_d01_pairwise_fisher":
            return `import itertools
import pandas as pd
from scipy.stats import fisher_exact
from statsmodels.stats.multitest import multipletests

tab = pd.crosstab(df["dv"], df["iv"])  # assumes a binary outcome by group
results = []

for left, right in itertools.combinations(tab.columns, 2):
    pair_tab = tab.loc[:, [left, right]].to_numpy()
    _, p_value = fisher_exact(pair_tab)
    results.append({"contrast": f"{left} vs {right}", "p_raw": p_value})

results = pd.DataFrame(results)
results["p_adj"] = multipletests(results["p_raw"], method="${statsmodelsAdjustMethod(adjustMethod)}")[1]
print(results)`;
        case "ph_d01_adjusted_residuals":
            return `import numpy as np
import pandas as pd
from scipy.stats import chi2_contingency

tab = pd.crosstab(df["dv"], df["iv"])
chi2, p, dof, expected = chi2_contingency(tab)
std_resid = (tab - expected) / np.sqrt(expected)`;
        case "ph_model_pairwise_emmeans":
            return `# not recommended: no single standard maintained Python engine is used here
# for model-based estimated marginal means across OLS, GLM, and mixed models
# prefer the R emmeans route shown below for pairwise contrasts of ${ctx.target}`;
        case "ph_model_simple_effects":
            return `# not recommended: no single standard maintained Python engine is used here
# for model-based simple-effects contrasts across OLS, GLM, and mixed models
# prefer the R emmeans route shown below for ${ctx.target} within ${ctx.byText}`;
        case "ph_model_interaction_slices":
            return `# not recommended: no single standard maintained Python engine is used here
# for model-based interaction-slice contrasts across OLS, GLM, and mixed models
# prefer the R emmeans route shown below for ${ctx.target} within ${ctx.byText}`;
        case "ph_model_treatment_vs_control":
            return `# not recommended: no single standard maintained Python engine is used here
# for model-based treatment-versus-control contrasts across OLS, GLM, and mixed models
# prefer the R emmeans route shown below for ${ctx.target} against '${ctx.control}'`;
        case "ph_model_custom_contrasts":
            return `# not recommended: no single standard maintained Python engine is used here
# for arbitrary model-based custom contrasts across OLS, GLM, and mixed models
# prefer the R emmeans route shown below for planned contrasts of ${ctx.target}`;
        case "ph_model_trend_tests":
            return `# placeholder disabled in the UI: no maintained Python implementation is exposed here
# for ordered-factor trend contrasts across model classes
# prefer the R emmeans route if you activate this extension later`;
        default:
            return `# fit = primary model
# add the post-hoc procedure that matches your selected option`;
    }
}

function getPosthocREffectCode(row, procedure, adjustMethod) {
    const ctx = getPosthocCodeContext(row, procedure);
    switch (procedure.id) {
        case "ph_a05_tukey_hsd":
            return `# pairwise standardized mean differences
emmeans::eff_size(emm, sigma = sigma(fit), edf = df.residual(fit))`;
        case "ph_a05_games_howell":
            return `# pairwise effect sizes for the reported contrasts
rstatix::cohens_d(df, y ~ group, var.equal = FALSE)
rstatix::hedges_g(df, y ~ group, var.equal = FALSE)`;
        case "ph_a05_dunnett":
            return `# effect sizes for the same estimated means
emmeans::eff_size(emm, sigma = sigma(fit), edf = df.residual(fit))`;
        case "ph_a07_dunn":
            return `# one example pair: A vs B
pair_df <- subset(df, group %in% c("A", "B"))
effectsize::rank_biserial(y ~ group, data = pair_df)
effsize::cliff.delta(y ~ group, data = pair_df)`;
        case "ph_a08_pairwise_wilcoxon":
            return `# df_pair should only contain the two conditions of one reported contrast
rstatix::wilcox_effsize(df_pair, y ~ condition, paired = TRUE)`;
        case "ph_d01_pairwise_prop_test":
        case "ph_d01_pairwise_fisher":
            return `# build one 2x2 table for each reported pair
pair_tab <- matrix(c(x1, n1 - x1, x2, n2 - x2), nrow = 2, byrow = TRUE)
epitools::oddsratio(pair_tab)
effectsize::phi(pair_tab)`;
        case "ph_d01_adjusted_residuals":
            return `# omnibus association size for the whole table
effectsize::cramers_v(tab)`;
        case "ph_model_pairwise_emmeans":
        case "ph_model_simple_effects":
        case "ph_model_interaction_slices":
        case "ph_model_treatment_vs_control":
        case "ph_model_custom_contrasts":
        case "ph_model_trend_tests":
            return `# Requires the fitted primary model saved as \`fit\` and the emmeans object saved as \`emm\`
# Gaussian models: standardized differences from estimated means
emmeans::eff_size(emm, sigma = sigma(fit), edf = df.residual(fit))

# GLM / GLMM: use the response scale for odds ratios or rate ratios
summary(pairs(emm, adjust = "${adjustMethod}"), type = "response")`;
        default:
            return `# add the effect size code that matches your selected option`;
    }
}

function getPosthocPythonEffectCode(row, procedure, adjustMethod) {
    const ctx = getPosthocCodeContext(row, procedure);
    switch (procedure.id) {
        case "ph_a05_tukey_hsd":
        case "ph_a05_games_howell":
        case "ph_a05_dunnett":
            return `import pingouin as pg

# one example pair: group A vs group B
pg.compute_effsize(x1, x2, eftype="cohen")
pg.compute_effsize(x1, x2, eftype="hedges")`;
        case "ph_a07_dunn":
            return `import pingouin as pg

# one example pair: group A vs group B
pg.mwu(x1, x2)  # includes rank-biserial correlation`;
        case "ph_a08_pairwise_wilcoxon":
            return `import pingouin as pg

# one example paired contrast
pg.wilcoxon(x1, x2)  # includes matched rank-biserial correlation`;
        case "ph_d01_pairwise_prop_test":
        case "ph_d01_pairwise_fisher":
            return `from statsmodels.stats.contingency_tables import Table2x2

pair_tab = [[x1, n1 - x1], [x2, n2 - x2]]
out = Table2x2(pair_tab)
out.oddsratio
out.riskratio`;
        case "ph_d01_adjusted_residuals":
            return `from scipy.stats.contingency import association

association(tab, method="cramer")`;
        case "ph_model_pairwise_emmeans":
        case "ph_model_simple_effects":
        case "ph_model_interaction_slices":
        case "ph_model_treatment_vs_control":
        case "ph_model_custom_contrasts":
        case "ph_model_trend_tests":
            return `# not recommended: no single standard maintained Python effect-size workflow is exposed here
# for model-based marginal means or custom contrasts across OLS, GLM, and mixed models
# prefer the R route shown below, or compute effect sizes directly from the final reported contrasts`;
        default:
            return `# add the effect size code that matches your selected option`;
    }
}

function renderPosthocCodeExamples(row, procedure, adjustMethod) {
    const wrap = document.createElement("div");
    wrap.className = "selected-option-details";

    const effectsCard = document.createElement("div");
    effectsCard.className = "nested-posthoc-card";
    effectsCard.innerHTML =
        "<h6>Effect sizes for this option</h6><p>Use these effect sizes for the selected post-hoc method.</p>";
    const effectRow = document.createElement("div");
    effectRow.className = "badge-row";
    (procedure.effect_sizes || []).forEach((effectName) => {
        const badge = document.createElement("span");
        badge.className = "badge";
        badge.textContent = prettyEffectSize(effectName);
        effectRow.appendChild(badge);
    });
    effectsCard.appendChild(effectRow);
    effectsCard.appendChild(
        createMetaItem(
            "What to report",
            "For each contrast: estimate, SE, test statistic, CI, adjusted p value, effect size, and estimate scale.",
        ),
    );
    wrap.appendChild(effectsCard);

    const codeLead = document.createElement("div");
    codeLead.className = "nested-posthoc-card";
    codeLead.innerHTML =
        '<h6>Code for this option</h6><p>The code below changes with the selected method and p-value correction.</p>';
    wrap.appendChild(codeLead);

    const grid = document.createElement("div");
    grid.className = "code-grid";
    grid.appendChild(
        codeCard(
            "Post-hoc in R",
            getPosthocRCode(row, procedure, adjustMethod),
            getPosthocREffectCode(row, procedure, adjustMethod),
        ),
    );
    grid.appendChild(
        codeCard(
            "Post-hoc in Python",
            getPosthocPythonCode(row, procedure, adjustMethod),
            getPosthocPythonEffectCode(row, procedure, adjustMethod),
        ),
    );
    wrap.appendChild(grid);
    return wrap;
}

function hasActionableEquivalence(row) {
    const text = norm(row.equivalence_option);
    return Boolean(text) && !/no simple standard/i.test(text);
}

function getEquivalenceRCode(row) {
    if (!hasActionableEquivalence(row)) return "";
    switch (row.id) {
        case "A01":
            return `# define lower and upper equivalence bounds first
TOSTER::t_TOST(
  y ~ group,
  data = df,
  paired = FALSE,
  var.equal = FALSE,
  eqb = c(lower, upper)
)`;
        case "A02":
            return `# define lower and upper equivalence bounds first
TOSTER::t_TOST(
  y ~ condition,
  data = df,
  paired = TRUE,
  eqb = c(lower, upper)
)`;
        case "A06":
            return `# one planned paired equivalence contrast
TOSTER::t_TOST(
  y ~ condition,
  data = df_pair,
  paired = TRUE,
  eqb = c(lower, upper)
)`;
        default:
            return `# not available
# choose the equivalence framework first and define the equivalence bounds`;
    }
}

function getEquivalencePythonCode(row) {
    if (!hasActionableEquivalence(row)) return "";
    switch (row.id) {
        case "A01":
            return `import pingouin as pg

# define lower and upper equivalence bounds first
pg.tost(x1, x2, bound=(lower, upper), paired=False)`;
        case "A02":
            return `import pingouin as pg

# define lower and upper equivalence bounds first
pg.tost(x1, x2, bound=(lower, upper), paired=True)`;
        case "A06":
            return `import pingouin as pg

# one planned paired equivalence contrast
pg.tost(x1, x2, bound=(lower, upper), paired=True)`;
        default:
            return `# not available
# choose the equivalence framework first and define the equivalence bounds`;
    }
}

function renderResolvedTestPanel(row) {
    const panel = document.createElement("div");
    panel.className = "unified-panel";
    const effectNames = effectItemsForRow(row);
    const eff = effectProfile(row.recommended_test);
    const showEffectCodeExamples = !hasOnlyEffectNote(effectNames);

    const intro = document.createElement("div");
    intro.className = "unified-intro";
    intro.innerHTML =
        '<div class="section-kicker">Primary test</div>' +
        '<h3>' + escapeHtml(row.recommended_test) + '</h3>' +
        '<p>' + escapeHtml(row.what_it_does) + '</p>';
    panel.appendChild(intro);

    const topGrid = document.createElement("div");
    topGrid.className = "unified-grid";

    const primaryCard = document.createElement("div");
    primaryCard.className = "unified-card";
    primaryCard.innerHTML =
        '<h3>Interpretation focus</h3>' +
        '<p>' + escapeHtml(interpretationHint(row.recommended_test)) + '</p>';
    topGrid.appendChild(primaryCard);

    const optionalCard = document.createElement("div");
    optionalCard.className = "unified-card";
    optionalCard.innerHTML =
        '<h3>Optional checks</h3>' +
        '<p>' + escapeHtml(row.follow_up_questions || 'No extra checks stored for this row.') + '</p>';
    topGrid.appendChild(optionalCard);
    panel.appendChild(topGrid);

    panel.appendChild(
        createDecisionBanner(
            'Use this test when the answers in the tree match this path. ' + reportingTip(row)
        )
    );

    const effectCard = document.createElement("div");
    effectCard.className = "unified-card";
    effectCard.innerHTML = '<h3>Effect sizes</h3>';
    effectCard.appendChild(createEffectNameList(effectNames, "row"));
    panel.appendChild(effectCard);

    const extraCard = document.createElement("div");
    extraCard.className = "unified-card";
    extraCard.innerHTML = '<h3>Optional extras</h3>';
    const extraGrid = document.createElement('div');
    extraGrid.className = 'posthoc-meta';
    extraGrid.appendChild(createMetaItem('Bayesian version', row.bayes_test || '—'));
    extraGrid.appendChild(createMetaItem('Equivalence', row.equivalence_option || '—'));
    extraGrid.appendChild(createMetaItem('What to report', reportingTip(row)));
    extraCard.appendChild(extraGrid);
    panel.appendChild(extraCard);

    const codeGrid = document.createElement("div");
    codeGrid.className = "code-grid";
    codeGrid.appendChild(
        codeCard(
            "R",
            row.r_code || "# not available",
            showEffectCodeExamples ? eff.r : "",
        ),
    );
    codeGrid.appendChild(
        codeCard(
            "Python",
            row.python_code || "# not available",
            showEffectCodeExamples ? eff.py : "",
        ),
    );
    if (row.bayes_test) {
        codeGrid.appendChild(codeCard("Bayes R", row.bayes_r_code || "# not available", ""));
        codeGrid.appendChild(codeCard("Bayes Python", row.bayes_python_code || "# not available", ""));
    }
    if (hasActionableEquivalence(row)) {
        codeGrid.appendChild(codeCard("Equivalence in R", getEquivalenceRCode(row) || "# not available", ""));
        codeGrid.appendChild(codeCard("Equivalence in Python", getEquivalencePythonCode(row) || "# not available", ""));
    }
    panel.appendChild(codeGrid);

    panel.appendChild(
        renderInterpretationPanel({
            effectNames,
            sourceType: "row",
            includeBayes: Boolean(row.bayes_test),
            estimateScale: row.estimate_scale || "",
            rowId: row.id,
            testName: row.recommended_test,
        })
    );

    return panel;
}

function sameRowSet(match, expectedIds) {
    const matchIds = match
        .map((row) => row.id)
        .sort()
        .join("|");
    const expected = [...expectedIds].sort().join("|");
    return matchIds === expected;
}

function routeChooserConfig(match) {
    if (sameRowSet(match, ["A10", "A10b"])) {
        return {
            title: "Choose the analysis target for this branch",
            lead:
                "The visible tree path is the same here, but two different analysis goals are possible. Choose correlation when you only want to quantify monotonic association. Choose regression when you want a directional slope model.",
            options: [
                {
                    route: "association",
                    label: "Association only",
                    description:
                        "Spearman rank correlation for monotonic association without a slope model.",
                    rowId: "A10",
                },
                {
                    route: "slope_estimation",
                    label: "Slope / prediction",
                    description:
                        "Robust simple linear regression when the goal is coefficient estimation or prediction under weak Gaussian assumptions.",
                    rowId: "A10b",
                },
            ],
        };
    }

    if (sameRowSet(match, ["A12", "A12b"])) {
        return {
            title: "Choose the regression target for this branch",
            lead:
                "The study design is the same on this branch, but the inferential target is different. Choose robust regression for coefficient estimation under outliers or heavy tails. Choose permutation regression when the main goal is permutation-based inference.",
            options: [
                {
                    route: "robust_estimation",
                    label: "Robust estimation",
                    description:
                        "Robust multiple regression for outlier-resistant coefficient estimation.",
                    rowId: "A12",
                },
                {
                    route: "permutation_inference",
                    label: "Permutation inference",
                    description:
                        "Permutation multiple regression when the main focus is weak-assumption p values or confidence assessment.",
                    rowId: "A12b",
                },
            ],
        };
    }

    return null;
}

function chooseLocalRoute(routeValue) {
    if (!routeValue) {
        return;
    }

    answers.route = routeValue;
    selectedResult = null;
    pendingResultScroll = true;
    pendingAssumptionScroll = false;
    pendingTreeViewportScroll = false;
    render();
    scrollToSection("resultArea");
}

function renderRouteChooserPanel(match) {
    const config = routeChooserConfig(match);

    if (!config) {
        return null;
    }

    const panel = document.createElement("div");
    panel.className = "unified-panel";

    const intro = document.createElement("div");
    intro.className = "unified-intro";
    intro.innerHTML =
        '<h3>' + escapeHtml(config.title) + '</h3>' +
        '<p>' + escapeHtml(config.lead) + '</p>';
    panel.appendChild(intro);

    const grid = document.createElement("div");
    grid.className = "unified-grid";

    config.options.forEach((option) => {
        const row = match.find((candidate) => candidate.id === option.rowId);
        if (!row) {
            return;
        }

        const card = document.createElement("div");
        card.className = "unified-card";
        card.innerHTML =
            '<h3>' + escapeHtml(row.recommended_test) + '</h3>' +
            '<p><strong>' + escapeHtml(option.label) + '</strong><br>' +
            escapeHtml(option.description) + '</p>';

        const buttonRow = document.createElement("div");
        buttonRow.className = "choice-row";
        buttonRow.appendChild(
            createChoiceChip("Use this route", {
                selected: answers.route === option.route,
                onClick: () => chooseLocalRoute(option.route),
            }),
        );
        card.appendChild(buttonRow);
        grid.appendChild(card);
    });

    panel.appendChild(grid);
    return panel;
}

function renderPosthocPanel(row) {
    if (!row.posthoc || !row.posthoc.available) return null;

    const state = getPosthocState(row);
    const selectedProcedure = getProcedureById(row, state.procedure_id);
    if (!selectedProcedure) return null;
    const panel = document.createElement("div");
    panel.className = "unified-panel";

    const intro = document.createElement("div");
    intro.className = "unified-intro";
    intro.innerHTML =
        '<div class="section-kicker">Post-hoc</div>' +
        '<h3>Post-hoc options for ' + escapeHtml(row.recommended_test) + '</h3>' +
        '<p>Choose a follow-up method and a matching p-value correction.</p>';
    panel.appendChild(intro);

    const optionsGrid = document.createElement("div");
    optionsGrid.className = "unified-grid";

    const optionsCard = document.createElement("div");
    optionsCard.className = "unified-card";
    optionsCard.innerHTML =
        '<h3>Available checks</h3>' +
        '<p>Choose a post-hoc method.</p>';

    const procedureRow = document.createElement("div");
    procedureRow.className = "choice-row";
    getVisiblePosthocProcedures(row).forEach((procedure) => {
        const availability = getProcedureAvailability(row, procedure);
        procedureRow.appendChild(
            createChoiceChip(procedure.label, {
                selected: procedure.id === state.procedure_id,
                disabled: !availability.enabled,
                title: availability.reasons.join(' '),
                onClick: () => setPosthocProcedure(row, procedure.id),
            }),
        );
    });
    optionsCard.appendChild(procedureRow);

    const methodHelp = document.createElement('div');
    methodHelp.className = 'help-text-box';
    methodHelp.innerHTML =
        '<h4>Description</h4>' +
        '<p>' + escapeHtml(getPosthocMethodGuidance(row, selectedProcedure)) + '</p>';
    optionsCard.appendChild(methodHelp);
    optionsGrid.appendChild(optionsCard);

    const correctionCard = document.createElement("div");
    correctionCard.className = "unified-card";
    correctionCard.innerHTML =
        '<h3>P-value correction for this option</h3>' +
        '<p>Choose a p-value correction method.</p>';

    const adjustRow = document.createElement("div");
    adjustRow.className = "choice-row";
    getAllowedAdjustMethods(selectedProcedure).forEach((method) => {
        adjustRow.appendChild(
            createChoiceChip(prettyAdjustMethod(method), {
                selected: state.adjust_method === method,
                onClick: () => setPosthocAdjustMethod(row, method),
            }),
        );
    });
    correctionCard.appendChild(adjustRow);

    const correctionHelp = document.createElement('div');
    correctionHelp.className = 'help-text-box';
    correctionHelp.innerHTML =
        '<h4>Description</h4>' +
        '<p>' + escapeHtml(getAdjustMethodGuidance(row, selectedProcedure, state.adjust_method)) + '</p>';
    correctionCard.appendChild(correctionHelp);
    optionsGrid.appendChild(correctionCard);
    panel.appendChild(optionsGrid);

    panel.appendChild(
        createDecisionBanner(
            getPosthocMethodGuidance(row, selectedProcedure) + ' Current correction: ' +
            prettyAdjustMethod(state.adjust_method) + '. ' +
            getAdjustMethodGuidance(row, selectedProcedure, state.adjust_method)
        )
    );

    const effectCard = document.createElement("div");
    effectCard.className = "unified-card";
    effectCard.innerHTML = '<h3>Effect sizes</h3>';
    effectCard.appendChild(
        createEffectNameList(selectedProcedure.effect_sizes || [], "posthoc"),
    );
    panel.appendChild(effectCard);

    const codeGrid = document.createElement("div");
    codeGrid.className = "code-grid";
    codeGrid.appendChild(codeCard('Post-hoc in R', getPosthocRCode(row, selectedProcedure, state.adjust_method), getPosthocREffectCode(row, selectedProcedure, state.adjust_method)));
    codeGrid.appendChild(codeCard('Post-hoc in Python', getPosthocPythonCode(row, selectedProcedure, state.adjust_method), getPosthocPythonEffectCode(row, selectedProcedure, state.adjust_method)));
    panel.appendChild(codeGrid);

    panel.appendChild(
        renderInterpretationPanel({
            effectNames: selectedProcedure.effect_sizes || [],
            sourceType: "posthoc",
            includeBayes: false,
            estimateScale: selectedProcedure.estimate_scale || row.estimate_scale || "",
            rowId: row.id,
            testName: row.recommended_test,
            procedureId: selectedProcedure.id,
        })
    );

    return panel;
}

function createValueTypeCell(title, definition, examples, note, tone) {
    const cell = document.createElement("div");
    cell.style.minWidth = "185px";
    cell.style.padding = "10px 12px";
    cell.style.border = "1px solid var(--bs-border-color, #d5dde7)";
    cell.style.borderRadius = "14px";
    cell.style.background = tone === "muted" ? "#f7f9fc" : "#ffffff";
    cell.style.boxShadow = "0 1px 2px rgba(15, 23, 42, 0.04)";

    const heading = document.createElement("div");
    heading.style.fontSize = "0.9rem";
    heading.style.fontWeight = "700";
    heading.style.color = "var(--bs-heading-color, #16324f)";
    heading.style.marginBottom = "8px";
    heading.textContent = title;
    cell.appendChild(heading);

    const definitionEl = document.createElement("p");
    definitionEl.className = "small";
    definitionEl.style.marginBottom = "8px";
    definitionEl.innerHTML = "<strong>Definition:</strong> " + escapeHtml(definition);
    cell.appendChild(definitionEl);

    const examplesEl = document.createElement("p");
    examplesEl.className = "small";
    examplesEl.style.marginBottom = note ? "8px" : "0";
    examplesEl.innerHTML = "<strong>Examples:</strong> " + escapeHtml(examples);
    cell.appendChild(examplesEl);

    if (note) {
        const noteEl = document.createElement("p");
        noteEl.className = "small";
        noteEl.style.marginBottom = "0";
        noteEl.innerHTML = "<strong>Note:</strong> " + escapeHtml(note);
        cell.appendChild(noteEl);
    }

    return cell;
}

function createValueTypeInfographic() {
    const wrapper = document.createElement("div");
    wrapper.className = "unified-panel";

    const intro = document.createElement("div");
    intro.className = "unified-intro";
    intro.innerHTML =
        "<h3>Discrete vs. continuous: quick guide</h3>" +
        "<p>Use this overview when you need to decide whether a variable should be treated as discrete or continuous.</p>";
    wrapper.appendChild(intro);

    const scrollRegion = document.createElement("div");
    scrollRegion.style.overflowX = "auto";
    scrollRegion.style.paddingBottom = "2px";
    scrollRegion.style.webkitOverflowScrolling = "touch";

    const matrix = document.createElement("div");
    matrix.style.display = "grid";
    matrix.style.gridTemplateColumns = "130px repeat(4, minmax(185px, 1fr))";
    matrix.style.gap = "10px";
    matrix.style.minWidth = "910px";
    matrix.style.alignItems = "stretch";

    const corner = document.createElement("div");
    corner.style.padding = "12px 14px";
    corner.style.border = "1px solid var(--bs-border-color, #d5dde7)";
    corner.style.borderRadius = "14px";
    corner.style.background = "#eef3f8";
    corner.style.fontWeight = "700";
    corner.style.color = "var(--bs-heading-color, #16324f)";
    corner.textContent = "Value type / Scale level";
    matrix.appendChild(corner);

    ["Nominal", "Ordinal", "Interval", "Ratio"].forEach((label) => {
        const header = document.createElement("div");
        header.style.padding = "12px 14px";
        header.style.border = "1px solid var(--bs-border-color, #d5dde7)";
        header.style.borderRadius = "14px";
        header.style.background = "#eef3f8";
        header.style.fontWeight = "700";
        header.style.color = "var(--bs-heading-color, #16324f)";
        header.textContent = label;
        matrix.appendChild(header);
    });

    const discreteHeader = document.createElement("div");
    discreteHeader.style.padding = "12px 14px";
    discreteHeader.style.border = "1px solid var(--bs-border-color, #d5dde7)";
    discreteHeader.style.borderRadius = "14px";
    discreteHeader.style.background = "#f5f8fb";
    discreteHeader.style.fontWeight = "700";
    discreteHeader.style.color = "var(--bs-heading-color, #16324f)";
    discreteHeader.textContent = "Discrete";
    matrix.appendChild(discreteHeader);

    matrix.appendChild(createValueTypeCell(
        "Discrete nominal",
        "Categories without inherent order.",
        "Hair color, eye color, degree program, nationality, ZIP code, student ID number, phone number, operating system.",
        "Nominal data are typically discrete or categorical.",
        "default",
    ));
    matrix.appendChild(createValueTypeCell(
        "Discrete ordinal",
        "Ordered categories, but distances between ranks are not meaningfully measurable.",
        "School grade, rank, Likert scale, educational attainment, T-shirt size, pain level, satisfaction (low-medium-high).",
        "Ordinal data are in practice almost always discrete.",
        "default",
    ));
    matrix.appendChild(createValueTypeCell(
        "Discrete interval",
        "Ordered values with meaningful differences, but no true zero.",
        "Calendar year, IQ score, temperature in whole °C, temperature in whole °F, time of day in whole minutes, questionnaire sum score (e.g., SUS score).",
        "",
        "default",
    ));
    matrix.appendChild(createValueTypeCell(
        "Discrete ratio",
        "Ordered values with meaningful differences and a true zero, so ratios are meaningful.",
        "Number of children, errors, correct answers, visits, page count.",
        "Some variables are conceptually continuous, but may be recorded discretely due to rounding or measurement resolution; e.g., age may be stored in whole years rather than with finer precision.",
        "default",
    ));

    const continuousHeader = document.createElement("div");
    continuousHeader.style.padding = "12px 14px";
    continuousHeader.style.border = "1px solid var(--bs-border-color, #d5dde7)";
    continuousHeader.style.borderRadius = "14px";
    continuousHeader.style.background = "#f5f8fb";
    continuousHeader.style.fontWeight = "700";
    continuousHeader.style.color = "var(--bs-heading-color, #16324f)";
    continuousHeader.textContent = "Continuous";
    matrix.appendChild(continuousHeader);

    matrix.appendChild(createValueTypeCell(
        "Continuous nominal",
        "Not usually meaningful in this form.",
        "—",
        "Nominal variables are categorical and therefore typically discrete rather than continuous.",
        "muted",
    ));
    matrix.appendChild(createValueTypeCell(
        "Continuous ordinal",
        "Not usually meaningful in this form.",
        "— / rarely meaningful.",
        "Ordinal variables are typically represented by discrete ordered categories rather than continuous values.",
        "muted",
    ));
    matrix.appendChild(createValueTypeCell(
        "Continuous interval",
        "Ordered values with meaningful differences, but no true zero.",
        "Temperature in °C, temperature in °F, time of day, date on a continuous time axis, mean questionnaire score (e.g., NASA-TLX mean or weighted score).",
        "",
        "default",
    ));
    matrix.appendChild(createValueTypeCell(
        "Continuous ratio",
        "Ordered values with meaningful differences and a true zero, so ratios are meaningful.",
        "Height, weight, distance, duration, reaction time, speed, volume.",
        "",
        "default",
    ));

    scrollRegion.appendChild(matrix);
    wrapper.appendChild(scrollRegion);

    return wrapper;
}


let selectedResult = null;
let pendingResultScroll = false;
let pendingAssumptionScroll = false;


/* =============================
   Result rendering
   ============================= */
function renderResult() {
    const match = matchingRows(answers);
    const key = currentStageKey();
    if (key === "dv_parametric") {
        renderParametricGuidance();
        if (pendingAssumptionScroll) {
            document.getElementById("resultArea").scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            pendingAssumptionScroll = false;
        }
        return;
    }

    const routeChooser = !key ? renderRouteChooserPanel(match) : null;
    if (routeChooser) {
        resultArea.innerHTML = "";
        resultArea.appendChild(routeChooser);
        return;
    }

    const resolvedRow = match.length === 1 && !key ? match[0] : null;
    if (resolvedRow) {
        const r = resolvedRow;
        resultArea.innerHTML = "";
        resultArea.appendChild(renderResolvedTestPanel(r));

        if (r.posthoc && r.posthoc.available) {
            const posthocSep = document.createElement("hr");
            posthocSep.className = "sep";
            resultArea.appendChild(posthocSep);
            const posthocPanel = renderPosthocPanel(r);
            if (posthocPanel) {
                resultArea.appendChild(posthocPanel);
            }
        }

        if (pendingResultScroll) {
            document.getElementById("resultArea").scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            pendingResultScroll = false;
        }
    } else if (match.length > 1) {
        resultArea.innerHTML = "";
        if (key === "dv_kind" || key === "iv_kind") {
            resultArea.appendChild(createValueTypeInfographic());
            const spacer = document.createElement("div");
            spacer.style.height = "12px";
            resultArea.appendChild(spacer);
        }
        const hint = document.createElement("p");
        hint.className = "small";
        hint.textContent = "More than one compatible route remains. Answer the next question to resolve the model choice.";
        resultArea.appendChild(hint);
    } else {
        resultArea.innerHTML =
            '<p class="small">No compatible route remains. Clear the last choice and try a different branch.</p>';
    }
}

function render() {
    if (!overviewSvg || !answersEl || !questionArea || !resultArea) {
        return;
    }

    syncUrlToAnswers();
    drawTree();
    renderAnswers();
    renderQuestion();
    renderResult();

    if (pendingTreeViewportScroll) {
        window.requestAnimationFrame(scrollTreeToActiveStage);
    }
}
applyAnswerState(buildAnswerStateFromUrl());
render();

/* CHANGE LOG
 * - technical fixes: removed the duplicate M04 row, replaced invalid Python adjust-method handling
 *   with library-specific mappings, and moved special-case route disambiguation out of the visible tree
 * - statistical routes clarified: split A10 and A12 by analysis target, set A15 to LMM as default,
 *   distinguished GEE versus GLMM estimands in D08 and D09, and tightened ART / permutation wording
 * - code placeholders resolved: replaced pseudo-code with runnable examples where a maintained route exists,
 *   or marked the Python route explicitly as not recommended when no standard maintained implementation is used
 * - sources improved: the UI now uses a curated scientific_interpretation_sources set with trust labels
 *
 * TODO(statistics):
 * - add dedicated routing questions for mixed-ANOVA special cases versus LMM defaults when a broader UI revision is acceptable
 * - add explicit routing for count-model overdispersion / zero inflation and logistic separation instead of leaving them only as follow-up prompts
 */

