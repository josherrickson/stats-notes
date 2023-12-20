setwd("files/visualizeCollinearity-files/")
library(ggplot2)
### No collinearity

reps <- 1000
n <- 100
save <- matrix(nrow = reps, ncol = 3)

for (i in 1:reps) {
  x1 <- rnorm(n)
  x2 <- rnorm(n)
  y <- x1 + x2 + rnorm(n)

  mod <- lm(y ~ x1 + x2)
  save[i,] <- c(coef(mod)[-1], cor(x1, x2))
}
save <- data.frame(save)
names(save) <- c("b_1", "b_2", "correlation")
write(jsonlite::toJSON(save, dataframe = "rows", pretty = TRUE),
      "lowcorr.json")


## Moderate Collinearity

reps <- 1000
n <- 100
save <- matrix(nrow = reps, ncol = 3)

for (i in 1:reps) {
  x1 <- rnorm(n)
  x2 <- x1 + rnorm(n, sd = 1.5)
  y <- x1 + x2 + rnorm(n)

  mod <- lm(y ~ x1 + x2)
  save[i,] <- c(coef(mod)[-1], cor(x1, x2))
}
save <- data.frame(save)
names(save) <- c("b_1", "b_2", "correlation")
write(jsonlite::toJSON(save, dataframe = "rows", pretty = TRUE),
      "modcorr.json")


### High Collinearity

reps <- 1000
n <- 100
save <- matrix(nrow = reps, ncol = 3)

for (i in 1:reps) {
  x1 <- rnorm(n)
  x2 <- x1 + rnorm(n, sd = .5)
  y <- x1 + x2 + rnorm(n)

  mod <- lm(y ~ x1 + x2)
  save[i,] <- c(coef(mod)[-1], cor(x1, x2))
}
save <- data.frame(save)
names(save) <- c("b_1", "b_2", "correlation")
write(jsonlite::toJSON(save, dataframe = "rows", pretty = TRUE),
      "highcorr.json")

## Extremely High Collinearity

reps <- 1000
n <- 100
save <- matrix(nrow = reps, ncol = 3)

for (i in 1:reps) {
  x1 <- rnorm(n)
  x2 <- x1 + rnorm(n, sd = .1)
  y <- x1 + x2 + rnorm(n)

  mod <- lm(y ~ x1 + x2)
  save[i,] <- c(coef(mod)[-1], cor(x1, x2))
}
save <- data.frame(save)
names(save) <- c("b_1", "b_2", "correlation")
write(jsonlite::toJSON(save, dataframe = "rows", pretty = TRUE),
      "extremecorr.json")
