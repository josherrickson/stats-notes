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
names(save) <- c("b_1", "b_2")

ggplot(save, aes(x = b_1, y = b_2)) +
  geom_point() +
  geom_point(aes(x = 1, y = 1), col = "red", size = 3) +
  ylab(bquote(hat(beta)[2])) +
  xlab(bquote(hat(beta)[1])) +
  theme(text = element_text(size=15))
ggsave("../images/collinearity-low.svg")

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
names(save) <- c("b_1", "b_2")

ggplot(save, aes(x = b_1, y = b_2)) +
  geom_point() +
  geom_point(aes(x = 1, y = 1), col = "red", size = 3) +
  ylab(bquote(hat(beta)[2])) +
  xlab(bquote(hat(beta)[1])) +
  theme(text = element_text(size=15))
ggsave("../images/collinearity-mod.svg")

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
names(save) <- c("b_1", "b_2")

ggplot(save, aes(x = b_1, y = b_2)) +
  geom_point() +
  geom_point(aes(x = 1, y = 1), col = "red", size = 3) +
  ylab(bquote(hat(beta)[2])) +
  xlab(bquote(hat(beta)[1])) +
  theme(text = element_text(size=15))
ggsave("../images/collinearity-high.svg")

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
names(save) <- c("b_1", "b_2")

ggplot(save, aes(x = b_1, y = b_2)) +
  geom_point() +
  geom_point(aes(x = 1, y = 1), col = "red", size = 3) +
  ylab(bquote(hat(beta)[2])) +
  xlab(bquote(hat(beta)[1])) +
  theme(text = element_text(size=15))
ggsave("../images/collinearity-extreme.svg")
