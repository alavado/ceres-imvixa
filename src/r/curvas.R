library(fpp2)
library(dplyr)
library(tidyverse)
library(caret)
setwd("~/Desktop/electron/ceres-imvixa/src/r")

datos <- readxl::read_excel("datos.xlsx")
names(datos) <- str_replace_all(names(datos), c(" " = "." , "," = "" ))
datos <- datos[complete.cases(datos$FCB.mes),]
datosCentros <- datos %>% group_by(Hoja) %>% mutate(counter = row_number())
datosCentros <- datosCentros[datosCentros$FCB.mes < 1.75 & datosCentros$FCB.mes > 1, ]
ggplot(datosCentros, aes(counter, FCB.mes, color=`T°`)) +
  geom_point() +
  scale_color_gradient(low="blue", high="red") +
  stat_smooth() +
  xlab('Mes del ciclo') +
  ylab('FCR biológica')

theme_set(theme_classic())

training.samples <- datosCentros$FCB.mes %>% createDataPartition(p = 0.75, list = FALSE)
train.data  <- datosCentros[training.samples, ]
test.data <- datosCentros[-training.samples, ]

ggplot(train.data, aes(counter, FCB.mes) ) +
  geom_point() +
  stat_smooth()

# Regresión lineal
model <- lm(FCB.mes ~ counter, data = train.data)
predictions <- model %>% predict(test.data)
data.frame(
  RMSE = RMSE(predictions, test.data$FCB.mes),
  R2 = R2(predictions, test.data$FCB.mes)
)
ggplot(train.data, aes(counter, FCB.mes)) +
  geom_point() +
  stat_smooth(method = lm, formula = y ~ x)

# Regresión polinomial de grado 4
model <- lm(FCB.mes ~ poly(counter, 4, raw = TRUE), data = train.data)
model %>% summary
predictions <- model %>% predict(test.data)
data.frame(
  RMSE = RMSE(predictions, test.data$FCB.mes),
  R2 = R2(predictions, test.data$FCB.mes)
)
ggplot(train.data, aes(counter, FCB.mes) ) +
  geom_point() +
  stat_smooth(method = lm, formula = y ~ poly(x, 4, raw = TRUE))

# Regresión logarítmica
model <- lm(FCB.mes ~ log(counter), data = train.data)
predictions <- model %>% predict(test.data)
data.frame(
  RMSE = RMSE(predictions, test.data$FCB.mes),
  R2 = R2(predictions, test.data$FCB.mes)
)
ggplot(train.data, aes(counter, FCB.mes) ) +
  geom_point() +
  stat_smooth(method = lm, formula = y ~ log(x))

# Regresión con splines
library(splines)
knots <- quantile(train.data$counter, p = c(0.25, 0.5, 0.75))
model <- lm (FCB.mes ~ bs(counter, knots = knots), data = train.data)
model %>% summary
predictions <- model %>% predict(test.data)
data.frame(
  RMSE = RMSE(predictions, test.data$FCB.mes),
  R2 = R2(predictions, test.data$FCB.mes)
)
ggplot(train.data, aes(counter, FCB.mes) ) +
  geom_point() +
  stat_smooth(method = lm, formula = y ~ splines::bs(x, df = 3))

# GAM
library(mgcv)
model <- gam(FCB.mes ~ s(counter), data = train.data)
model %>% summary
predictions <- model %>% predict(test.data)
data.frame(
  RMSE = RMSE(predictions, test.data$FCB.mes),
  R2 = R2(predictions, test.data$FCB.mes)
)
ggplot(train.data, aes(counter, FCB.mes) ) +
  geom_point() +
  stat_smooth(method = gam, formula = y ~ s(x))

