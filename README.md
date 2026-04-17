# Statistical Decision Tree
Interactive decision support for students and researchers who need orientation when choosing inferential statistics and null hypothesis significance testing (NHST) procedures in HCI research.

This repository contains the browser-based Statistical Decision Tree from the HCI User Studies Toolkit. The current version replaces the former static infographic with an interactive web application that guides users step by step through the main design decisions behind a statistical analysis route.

## What The Application Provides

- An interactive decision tree for selecting suitable statistical tests and models
- A full visual overview of the complete tree together with guided question-by-question navigation
- Result cards with reporting guidance, assumption checks, effect size hints, and follow-up options
- Example code snippets for R and Python
- A mobile-friendly layout in which the tree remains horizontally scrollable without collapsing the full structure

## Project Structure

- `index.html`: main entry point of the application
- `_css/`: Bootstrap assets, shared toolkit styling, and decision-tree-specific styles
- `_js/`: Bootstrap bundle and the interactive decision-tree application logic
- `_img/`: toolkit and affiliation assets

## Local Use

The project is a static web application and can be opened directly in a browser via `index.html`. No separate build step is required for the current version.

## Notes

The tool is intended as orientation support for students and novice researchers. It does not replace statistical training, supervision, or study-specific methodological consultation.

If you want to adequately <a href="https://github.com/valentin-schwind/statistics-decision-tree/blob/master/HCIToolkit.bib"> cite</a> this work, and show us your amazing projects!

```
@inproceedings{schwind2023a,
	author = {Schwind, Valentin and Resch, Stefan and Sehrt, Jessica},
	title = {The HCI User Studies Toolkit: Supporting Study Designing and Planning for Undergraduates and Novice Researchers in Human-Computer Interaction},
	year = {2023},
	isbn = {978-1-4503-9422-2/23/04},
	publisher = {Association for Computing Machinery},
	address = {New York, NY, USA},
	url = {https://doi.org/10.1145/3544549.3585890},
	doi = {10.1145/3544549.3585890},
	booktitle = {Extended Abstracts of the 2020 CHI Conference on Human Factors in Computing Systems},
	location = {Hamburg, Germany},
	series = {CHI EA '23}
}
```
