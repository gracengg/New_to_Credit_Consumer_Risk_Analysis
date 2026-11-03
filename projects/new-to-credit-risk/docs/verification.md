# Publication verification

Environment: Python 3.12; NumPy 2.5.4; pandas 2.2.3; scikit-learn 1.8.0; XGBoost 3.0.5.

Completed checks:

- Ten behavioral tests passed, including exclusion of deliberately inserted outcome proxies, split separation, train-only imputation, unchanged model selection when test labels are altered, one frozen threshold and FICO/reporting boundaries.
- The command-line workflow completed on 600 newly generated demonstration profiles, including logistic regression, Random Forest and XGBoost.
- The optional local Tableau CSV export completed on demonstration data.
- All three code cells in the reviewed notebook executed sequentially in a Python process; the notebook validates against the notebook schema and contains only demonstration and historical-summary outputs.
- Python source compilation and Tableau XML parsing passed.

The host could not start an interactive Jupyter kernel, so no native Jupyter-session verification is claimed. Tableau Desktop was unavailable; the workbook was not visually rendered. The original coursework CSV was absent, so corrected original-data metrics remain unverified. These limits also appear in the README and portfolio.
