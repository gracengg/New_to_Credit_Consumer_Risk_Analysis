# New-to-Credit Consumer Risk Analysis

**An academic study of thin-file credit profiles, model evaluation and the trade-offs behind risk flags.**

Original course project by **Chloe Pham and Grace Ngo**, Dickinson College, Statistical and Machine Learning, May 2025. This publication organizes the project into a reproducible Python workflow, a reviewed analytical narrative and a portable Tableau template.

## Executive overview

The project examines how behavioral and financial information can support analysis when traditional credit history is limited. Its central decision question is how a more selective high-risk flag changes the balance between false positives and missed charge-offs.

The supplied report describes 2,000 synthetic customer profiles, including 41.5% without a FICO score. The original notebook records a 14.15% charge-off share before outlier removal. The outcome is **`Ever_ChargeOff`**, a historical-status label. Without observation dates and a future outcome window, this project supports retrospective classification research rather than a validated forecast of future default.

**Publication status:** the code has been tested end to end on a newly generated demonstration dataset. The original coursework CSV was not supplied, so corrected original-data performance has not been reproduced. Demonstration results are explicitly identified and never substituted for the academic results.

## Analytical contribution

- Frame model scores as inputs to a decision process and distinguish false-positive risk flags from missed positive outcomes.
- Compare a no-skill baseline, logistic regression, Random Forest and XGBoost under the same evaluation protocol.
- Preserve missing-score information without assigning an impossible FICO score.
- Separate historical evidence from reproducible software verification and state the conditions required for a valid lending application.

## Reviewed workflow

1. **Validate the input schema.** Require numeric features and a binary outcome. Reject invalid scores, infinite values, duplicate feature profiles and insufficient class support.
2. **Apply an explicit feature allowlist.** Exclude `ChargeOff_Balance`, `Unpaid_CO_84M`, identifiers, reporting bands and unknown columns. `Age` is excluded from default model inputs.
3. **Split the unfiltered sample.** Use stratified 70% training, 15% validation and 15% test partitions before estimating preprocessing statistics. Retain the original distribution rather than removing rare profiles with a global IQR rule.
4. **Fit preprocessing on training only.** Estimate medians inside each model pipeline. Add missingness indicators and scale only the logistic baseline.
5. **Compare models on validation data.** Rank models by validation average precision. For each model, examine a declared threshold grid and maximize precision subject to an illustrative recall floor of 50% and at least 10 validation flags.
6. **Freeze the choice.** Evaluate the validation-selected model once on the held-out test partition, using the identical frozen threshold. Also report a no-skill baseline. Do not refit after selection.

The threshold constraints are transparent research assumptions. They are not optimized lending economics, a regulatory standard or an approval policy. Model scores are uncalibrated; they should not be described as validated probabilities of default.

## Corrections made for publication

| Issue in the supplied materials | Publication correction |
| --- | --- |
| Feature selection retained the outcome-related `ChargeOff_Balance` field | Explicit allowlist excludes outcome-related fields and ambiguous prior charge-off indicators |
| IQR row removal preceded splitting | No global row filtering; imputation learns from training only |
| Code used unstratified splits despite the report describing stratification | Both split stages explicitly stratify by the label |
| Random Forest validation used 0.70, while test used the estimator's default prediction rule | One explicit threshold function handles validation and test |
| Tableau export copied the actual label into `Predicted_Chargeoff_Score` | Rename it `Observed_Chargeoff`; observed group shares are not presented as predictions or net credit loss |
| FICO bands missed boundary values; zero income could create infinite ratios | Include scores 300 and 850, preserve no-score cases and handle zero denominators |
| Local computer and Colab paths prevented reproducibility | Relative paths, a command-line entry point and a runnable notebook |
| Presentation claims differed from notebook outputs | Document the saved notebook evidence and publish an edited analysis instead of reissuing contradictory slides |

See [the methodological review](docs/methodology_review.md) for details and interpretation limits.

## Historical notebook evidence

These are **saved outputs from the original notebook**, not a rerun of the corrected implementation. The original feature and preprocessing issues prevent these figures from serving as validated performance claims.

| Model | Split | Classification rule | TN / FP / FN / TP | Precision | Recall | Reported ROC AUC |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Random Forest | Validation | 0.70 | 212 / 9 / 12 / 18 | 66.7% | 60.0% | 0.953 |
| Random Forest | Test | Estimator default, approximately 0.50 | 190 / 29 / 0 / 33 | 53.2% | 100.0% | 0.943 |
| XGBoost | Validation | 0.70 | 206 / 15 / 12 / 18 | 54.5% | 60.0% | 0.944 |
| XGBoost | Test | 0.70 | 205 / 14 / 13 / 20 | 58.8% | 60.6% | 0.935 |

Confusion-matrix metrics are recalculated from the saved counts. AUC values are transcribed from saved text because per-row original model scores are unavailable. The test rows use different classification rules and do not establish that one model is superior. The presentation's alternative XGBoost test figures are not used.

Machine-readable evidence is in [historical_results.json](docs/historical_results.json). The notebook contains a separately labeled demonstration of the corrected workflow.

## Run the project

Python **3.12 or newer** is required. From this project directory:

```sh
python -m venv .venv
# macOS / Linux
source .venv/bin/activate
# Windows PowerShell: .venv\Scripts\Activate.ps1
python -m pip install -e '.[notebook]'
python -m ntc_risk --demo --output outputs/demo
python -m unittest discover -s tests -v
```

The default demonstration generates 600 new toy profiles in memory. Its data and results are for software verification only. To use an authorized original CSV:

```sh
python -m ntc_risk --data data/v_credit_data_NTC_v51825.csv --output outputs/coursework
```

The program writes aggregate validation comparisons, validation threshold tables and an evaluation JSON file containing the frozen selection, test metrics, data fingerprint, package versions and limitations. It does not export applicant-level predictions or make approval decisions. To omit XGBoost explicitly, add `--without-xgboost`.

The direct dependency versions used for verification are recorded in `requirements.txt`. The package metadata declares supported version ranges. See [data access](data/README.md) for the original-data limitation.

## Notebook and Tableau

- [Reviewed notebook](notebooks/NTC_Consumer_Credit.ipynb): explanation, executable demonstration and historical-evidence review. The checked-in outputs come from the new toy dataset only.
- [Tableau workbook](tableau/NTC.twb): nine worksheets and one dashboard from the supplied workbook, with relative data paths and corrected observed-rate terminology. It is a template requiring a local data export, not a hosted dashboard.

To prepare the local Tableau input:

```sh
python -m ntc_risk --data data/v_credit_data_NTC_v51825.csv \
  --output outputs/coursework --tableau-export data/tableau_input.csv
```

Open `tableau/NTC.twb` in Tableau Desktop and reconnect it to `data/tableau_input.csv` if prompted. The workbook's XML and formulas were reviewed; Tableau Desktop rendering has not been verified. The legacy `DTI` fields represent unsecured debt divided by annual income, **not** monthly debt-service DTI. Its 20% observed-share comparison remains an illustrative display reference, not a loss ceiling.

## Project structure

| Path | Purpose |
| --- | --- |
| `ntc_risk/pipeline.py` | Schema checks, preprocessing, models, threshold analysis and CLI |
| `notebooks/` | Reviewed, executed analytical notebook |
| `tests/` | Checks for leakage exclusions, split separation, threshold consistency and reporting boundaries |
| `docs/` | Edited analysis, evidence reconciliation and source fingerprints |
| `tableau/` | Portable exploratory workbook template |
| `data/` | Data-access instructions; original records are not bundled |

## Interpretation and next steps

A positive label means a recorded historical charge-off. A positive model flag is not an automatic rejection, and a negative flag is not an approval. Precision is a sample-level fraction of correct positive flags; 66.7% precision does not mean every applicant has a calibrated 66.7% risk estimate.

A future study requires the original data and data dictionary, observation and outcome dates, a reviewed feature-availability policy, temporal validation, calibration checks and appropriate subgroup analysis. Exposure and loss-severity data would be needed to evaluate expected loss. ROC AUC alone cannot establish calibration, profitability, fairness or readiness for deployment.

## Authorship and provenance

The original report and poster credit **Chloe Pham and Grace Ngo**. The publication preserves that collaboration. It does not infer individual ownership of code sections or claim deployment at a lender. The refactor and methodological review are publication updates, not a replacement account of what was submitted in the original course.

The original notebook, report, poster, slides, presentation script and Tableau workbook were reviewed. [Source fingerprints](docs/source_manifest.json) identify the exact files. Original slides and PDFs are not redistributed as current evidence because several claims require correction. No license is granted for the absent source dataset or third-party course materials.

## Technical references

- [scikit-learn: common pitfalls and data leakage](https://scikit-learn.org/stable/common_pitfalls.html)
- [scikit-learn: decision-threshold tuning](https://scikit-learn.org/stable/modules/classification_threshold.html)
- [scikit-learn: average precision](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.average_precision_score.html)

## Portfolio

[Read the analytical case](https://gracengg.github.io/case-studies/new-to-credit.html) | [Grace Ngo’s portfolio](https://gracengg.github.io/)
