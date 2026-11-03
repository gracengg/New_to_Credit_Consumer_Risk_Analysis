# Analytical brief

## Business question

How can an analyst study credit profiles with limited traditional history while making the consequences of a risk flag visible?

The original project compares Random Forest and XGBoost on synthetic new-to-credit profiles. A higher flagging threshold can reduce the number of positive flags and missed opportunities among non-charge-off records, but it can also miss more positive outcomes. Precision does not increase monotonically on every finite sample, and the best threshold cannot be inferred solely from whether a lender is a start-up or an established firm.

## Decision-relevant output

The reviewed workflow produces ranking metrics, precision and recall, false-positive and false-negative counts, flag rates and a threshold comparison. These outputs support a discussion of trade-offs. They do not by themselves specify an approval policy or demonstrate financial benefit.

## What the evidence supports

The saved notebook outputs show a validation comparison at a 0.70 threshold. Those results help reconstruct the original classroom argument, but outcome-related features, preprocessing before splitting and inconsistent test thresholds limit their interpretation. The publication therefore retains the figures as historical evidence rather than a performance headline.

The strongest current contribution is the connection between business framing and evaluation discipline: define the label, review feature eligibility, preserve missing-score information, compare baselines, select on validation only and report limitations alongside results.

## Next analytical milestone

With the original CSV, rerun the revised workflow and investigate any difference from the saved results. Keep the new evaluation separate from the demonstration. A prospective credit-risk study additionally needs time-defined inputs and outcomes before it can support claims about future borrowers.
