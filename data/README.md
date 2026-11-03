# Data access

The original input CSV is not included in the supplied project materials. Its expected filename in the academic notebook was `v_credit_data_NTC_v51825.csv`. The accompanying report describes 2,000 synthetic profiles; no generator, redistribution terms or original CSV was provided for this publication.

Do not reconstruct borrower rows from notebook previews or substitute the demonstration dataset when reporting historical project results. Put an authorized copy of the original CSV in this directory and pass its path explicitly to the CLI. CSV files are ignored by Git.

`python -m ntc_risk --demo` generates new toy inputs in memory for verification. These inputs do not reproduce the original dataset, original model scores or lending outcomes.

The schema and model exclusions are defined in `ntc_risk/pipeline.py`. An optional Tableau export is a row-level local file. Review it before any sharing; the program does not upload it.
